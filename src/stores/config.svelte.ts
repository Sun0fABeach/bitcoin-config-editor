import v28 from '@/configs/knots/v28.json'
import { unsetValue, isUnsetValue } from '@/lib/config'
import useOptionsStore, { setConfigRefreshCallback } from '@/stores/options.svelte'
import useSearchStore from '@/stores/search.svelte'
import { EditorValueType } from '@/enums'
import type { EditorValueAny, EditorValueMultiSelect, EditorValueMultiText } from '@/types/editor'
import type { CategoryDefinition, ConfigDefinition } from '@/types/config-definition'

const searchStore = useSearchStore()
const optionsStore = useOptionsStore()

setConfigRefreshCallback(refreshText)

const values = $state<Record<string, EditorValueAny>>({})

const configIndex: Record<
	string,
	{ categoryTitle: CategoryDefinition['title']; config: ConfigDefinition }
> = {}

const categories = v28

type ForEachConfigCallback = (
	key: string,
	configDefinition: ConfigDefinition,
	categoryTitle: CategoryDefinition['title'],
) => void

function forEachConfig(callback: ForEachConfigCallback) {
	categories.forEach((category) => {
		Object.entries(category.configs).forEach(
			([key, configDefinition]: [string, ConfigDefinition]) => {
				callback(key, configDefinition, category.title)
			},
		)
	})
}

forEachConfig((key, configDefinition, categoryTitle) => {
	values[key] = unsetValue(configDefinition.type)
	configIndex[key] = {
		categoryTitle,
		config: configDefinition,
	}
})

function getCategoryTitle(key: string) {
	return configIndex[key].categoryTitle
}

function getConfig(key: string) {
	return configIndex[key].config
}

function updateValue(key: string, value: EditorValueAny) {
	values[key] = value
	changeTextValue(key, value)
}

function unsetValues() {
	forEachConfig((key, configDefinition) => {
		values[key] = unsetValue(configDefinition.type)
	})
	refreshText()
}

const hasSetValues = $derived(
	Object.entries(values).some(([key, value]) => {
		const type = getConfig(key).type
		return !isUnsetValue(type, value)
	}),
)

/* editor values to text values translation */

const valuesAsText: Record<CategoryDefinition['title'], Record<string, string>> = {}

function changeTextValue(key: string, value: EditorValueAny) {
	const categoryTitle = getCategoryTitle(key)
	const { type, defaultValue } = getConfig(key)

	if (isUnsetValue(type, value)) {
		if (optionsStore.explicitDefaults && defaultValue) {
			setDefaultTextValue(categoryTitle, key, defaultValue)
		} else {
			removeTextValue(categoryTitle, key)
		}
	} else {
		setTextValue(categoryTitle, key, type, value)
	}

	updateCategoryText(categoryTitle)
}

function removeTextValue(categoryTitle: CategoryDefinition['title'], key: string) {
	if (!valuesAsText[categoryTitle]) {
		return
	}
	delete valuesAsText[categoryTitle][key]
	if (Object.keys(valuesAsText[categoryTitle]).length === 0) {
		delete valuesAsText[categoryTitle]
	}
}

function setDefaultTextValue(
	categoryTitle: CategoryDefinition['title'],
	key: string,
	defaultValue: ConfigDefinition['defaultValue'],
) {
	if (typeof defaultValue === 'string') {
		// hacky assumption that default values \w whitespace are just descriptions (e.g. #blocksdir)
		if (!defaultValue.includes(' ')) {
			setTextValue(categoryTitle, key, EditorValueType.TEXT, defaultValue)
		}
	} else if (typeof defaultValue === 'object') {
		// hacky assumption that default value objects have these properties (e.g. #assumevalid)
		setTextValue(
			categoryTitle,
			key,
			EditorValueType.TEXT,
			defaultValue.mainnet || defaultValue.clearnet,
		)
	}
}

function setTextValue(
	categoryTitle: CategoryDefinition['title'],
	key: string,
	type: EditorValueType,
	value: EditorValueAny,
) {
	if (!valuesAsText[categoryTitle]) {
		valuesAsText[categoryTitle] = {}
	}

	switch (type) {
		case EditorValueType.CHECKBOX:
			valuesAsText[categoryTitle][key] = `${key}=${value ? '1' : '0'}`
			break
		case EditorValueType.MULTI_TEXT:
		case EditorValueType.MULTI_SELECT:
			valuesAsText[categoryTitle][key] = (value as EditorValueMultiText | EditorValueMultiSelect)
				.map((v) => `${key}=${v}`)
				.join('\n')
			break
		default:
			valuesAsText[categoryTitle][key] = `${key}=${value}`
			break
	}
}

/* final text string assembly */

const categoryTitles = categories.map(({ title }) => title)

const finalCategoryTexts = $state(
	categoryTitles.reduce(
		(result, title) => {
			result[title] = ''
			return result
		},
		{} as Record<CategoryDefinition['title'], string>,
	),
)

const finalText = $derived(
	categoryTitles
		.map((categoryTitle) => finalCategoryTexts[categoryTitle])
		.filter((text) => text)
		.join('\n\n'),
)

function updateCategoryText(categoryTitle: CategoryDefinition['title']) {
	const category = valuesAsText[categoryTitle] ?? {}
	const configSeparator = optionsStore.inlineDescriptors ? '\n\n' : '\n'

	const configsText = Object.entries(category)
		.toSorted(([key1], [key2]) => key1.localeCompare(key2))
		.map(([key, value]) => {
			if (optionsStore.inlineDescriptors) {
				const config = configIndex[key].config
				const description = config.shortDescription || config.description
				return `# ${description}\n${value}`
			}
			return value
		})
		.join(configSeparator)

	finalCategoryTexts[categoryTitle] =
		configsText && `[${categoryTitle}]${configSeparator}${configsText}`
}

function refreshText() {
	Object.entries(values).forEach(([key, value]) => {
		changeTextValue(key, value)
	})
	categoryTitles.forEach(updateCategoryText)
}

refreshText()

/* search function */

const filteredConfigs = $derived.by(() => {
	const search = searchStore.normalizedSearch

	if (!search) {
		return null
	}

	const filteredKeys = Object.keys(values).filter((key) => {
		const config = getConfig(key)
		return (
			key.includes(search) ||
			(optionsStore.searchTitles && config.title.toLowerCase().includes(search)) ||
			(optionsStore.searchDescriptions && config.description.toLowerCase().includes(search))
		)
	})

	return filteredKeys.reduce(
		(result, key) => {
			result[key] = getConfig(key)
			return result
		},
		{} as CategoryDefinition['configs'],
	)
})

export default function () {
	return {
		// cast to unknown first to get rid of cryptic TS error
		categories: categories as unknown as CategoryDefinition[],
		getCategoryTitle,
		getConfig,
		get filteredConfigs() {
			return filteredConfigs
		},
		get values() {
			return values
		},
		get hasUserValues() {
			return hasSetValues
		},
		get text() {
			return finalText
		},
		updateValue,
		unsetValues,
	}
}
