import { unsetValue, isUnsetValue } from '@/lib/editor'
import useOptionsStore, {
	setSwitchConfigVersionCallback,
	setConfigRefreshCallback,
} from '@/stores/options.svelte'
import useSearchStore from '@/stores/search.svelte'
import { configs } from '@/lib/configs'
import { EditorValueType } from '@/enums'
import type { EditorValueAny, EditorValueMultiSelect, EditorValueMultiText } from '@/types/editor'
import type { CategoryDefinition, ConfigDefinition } from '@/types/config-definition'

const searchStore = useSearchStore()
const optionsStore = useOptionsStore()

setSwitchConfigVersionCallback(switchConfig)
setConfigRefreshCallback(refreshTextValues)

let categories = $state<CategoryDefinition[]>([])

let configIndex: Record<
	string,
	{ categoryTitle: CategoryDefinition['title']; config: ConfigDefinition }
> = {}

let values = $state<Record<string, EditorValueAny>>({})

function getCategories(useKnots: boolean, version: string) {
	return useKnots ? configs.knots[version] : configs.core[version]
}

export function initializeConfig() {
	categories = getCategories(optionsStore.useKnots, optionsStore.currentVersion)

	forEachConfig(categories, (key, configDefinition, categoryTitle) => {
		values[key] = unsetValue(configDefinition.type)
		configIndex[key] = {
			categoryTitle,
			config: configDefinition,
		}
	})

	initTextGeneration()
}

let configSwitchIssues = $state<{
	newVersionIsKnots: boolean
	newVersion: string
	missingOptions: string[]
	unsupportedValues: string[]
	proceed: (value: boolean) => void
} | null>(null)

async function switchConfig(useKnots: boolean, version: string) {
	const newCategories = getCategories(useKnots, version)
	const newConfigIndex: typeof configIndex = {}
	const newValues: typeof values = {}
	const missingOptions: string[] = []
	const unsupportedValues: string[] = []

	/* 1. construct new config data and take set values from old config if possible */

	forEachConfig(newCategories, (key, configDefinition, categoryTitle) => {
		const { type, options } = configDefinition
		const oldValue = values[key]

		let keepOldValue = oldValue !== undefined && !isUnsetValue(type, oldValue)
		if (keepOldValue && options && !options.find(({ value }) => oldValue === value)) {
			unsupportedValues.push(valuesAsText[categoryTitle][key])
			keepOldValue = false
		}

		if (keepOldValue) {
			newValues[key] = oldValue
		} else {
			newValues[key] = unsetValue(type)
		}

		newConfigIndex[key] = {
			categoryTitle,
			config: configDefinition,
		}
	})

	/* 2. check if old config contains options that new config doesn't have */

	forEachConfig(categories, (key, configDefinition) => {
		const { type } = configDefinition
		const oldValue = values[key]
		if (!isUnsetValue(type, oldValue) && !newConfigIndex[key]) {
			missingOptions.push(key)
		}
	})

	/* 3. ask user if he wants to proceed in case of conflicts */

	let proceed = Promise.resolve(true)

	if (missingOptions.length > 0 || unsupportedValues.length > 0) {
		const { promise, resolve } = Promise.withResolvers<boolean>()
		proceed = promise
		configSwitchIssues = {
			newVersionIsKnots: useKnots,
			newVersion: version,
			missingOptions,
			unsupportedValues,
			proceed: resolve, // wait for user to confirm via dialog
		}
	}

	try {
		if (await proceed) {
			categories = newCategories
			configIndex = newConfigIndex
			values = newValues
			initTextGeneration()
			return true
		} else {
			return false
		}
	} finally {
		configSwitchIssues = null
	}
}

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
	forEachConfig(categories, (key, configDefinition) => {
		values[key] = unsetValue(configDefinition.type)
	})
	refreshTextValues()
}

const hasSetValues = $derived(
	Object.entries(values).some(([key, value]) => {
		const type = getConfig(key).type
		return !isUnsetValue(type, value)
	}),
)

type ForEachConfigCallback = (
	key: string,
	configDefinition: ConfigDefinition,
	categoryTitle: CategoryDefinition['title'],
) => void

function forEachConfig(categoryList: CategoryDefinition[], callback: ForEachConfigCallback) {
	categoryList.forEach((category) => {
		Object.entries(category.configs).forEach(
			([key, configDefinition]: [string, ConfigDefinition]) => {
				callback(key, configDefinition, category.title)
			},
		)
	})
}

function initTextGeneration() {
	initFinalTextAssembly()
	initValuesAsText() // needs to be called second
}

/* editor values to text values translation */

let valuesAsText: Record<CategoryDefinition['title'], Record<string, string>> = {}

function initValuesAsText() {
	valuesAsText = {}
	refreshTextValues()
}

function refreshTextValues() {
	Object.entries(values).forEach(([key, value]) => {
		changeTextValue(key, value)
	})
}

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

let categoryTitles = $state<ReturnType<typeof initCategoryTitles>>([])
let categoryTexts = $state<ReturnType<typeof initCategoryTexts>>({})

function initFinalTextAssembly() {
	categoryTitles = initCategoryTitles()
	categoryTexts = initCategoryTexts()
}

function initCategoryTitles() {
	return categories.map(({ title }) => title)
}

function initCategoryTexts() {
	return categoryTitles.reduce(
		(result, title) => {
			result[title] = ''
			return result
		},
		{} as Record<CategoryDefinition['title'], string>,
	)
}

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

	categoryTexts[categoryTitle] = configsText && `[${categoryTitle}]${configSeparator}${configsText}`
}

const finalText = $derived(
	categoryTitles
		.map((categoryTitle) => categoryTexts[categoryTitle])
		.filter((text) => text)
		.join('\n\n'),
)

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
		getCategoryTitle,
		getConfig,
		get categories() {
			return categories
		},
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
		get configSwitchIssues() {
			return configSwitchIssues
		},
	}
}
