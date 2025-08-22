import { unsetValue, isUnsetValue } from '@/lib/editor'
import useSettingsStore, {
	setSwitchConfigVersionCallback,
	setConfigRefreshCallback,
} from '@/stores/settings.svelte'
import useSearchStore from '@/stores/search.svelte'
import { configsGenerators, type UploadedConfigValues } from '@/lib/configs'
import { EditorValueType } from '@/enums'
import type {
	EditorValueAny,
	EditorValueText,
	EditorValueNumber,
	EditorValueCheckbox,
	EditorValueMultiText,
	EditorValueMultiSelect,
	EditorValueSelect,
} from '@/types/editor'
import type { CategoryDefinition, ConfigDefinition } from '@/types/config-definition'

const searchStore = useSearchStore()
const settingsStore = useSettingsStore()

setSwitchConfigVersionCallback(switchConfigVersion)
setConfigRefreshCallback(refreshTextValues)

export interface ConfigValueIssues {
	targetVersionIsKnots: boolean
	targetVersion: string
	missingOptions: string[]
	unsupportedValues: string[]
	proceed: (value: boolean) => void
}

let configSwitchIssues = $state<ConfigValueIssues | null>(null)
let replaceValuesIssues = $state<ConfigValueIssues | null>(null)

let categories = $state<CategoryDefinition[]>([])

let configIndex: Record<
	string,
	{ categoryTitle: CategoryDefinition['title']; config: ConfigDefinition }
> = {}

let values = $state<Record<string, EditorValueAny>>({})

// multi-text/select options need to be rerendered on config clean/switch/replace
let renderKey = $state(0)

export function initializeConfig() {
	categories = getCategories(settingsStore.useKnots, settingsStore.currentVersion)

	forEachConfig(categories, (key, configDefinition, categoryTitle) => {
		values[key] = unsetValue(configDefinition.type)
		configIndex[key] = {
			categoryTitle,
			config: configDefinition,
		}
	})

	initTextGeneration()
}

function getCategories(useKnots: boolean, version: string) {
	return configsGenerators[useKnots ? 'knots' : 'core'][version]()
}

function getCategoryTitle(key: string) {
	return configIndex[key].categoryTitle
}

function getConfig(key: string) {
	return configIndex[key].config
}

async function switchConfigVersion(useKnots: boolean, version: string) {
	const newCategories = getCategories(useKnots, version)
	const newConfigIndex: typeof configIndex = {}
	const newValues: typeof values = {}
	const missingOptions: string[] = []
	const unsupportedValues: string[] = []

	/* 1. construct new config data and take set values from old config if possible */

	forEachConfig(newCategories, (key, configDefinition, categoryTitle) => {
		const { type, options } = configDefinition
		let oldValue = values[key]

		let keepOldValue = oldValue !== undefined && !isUnsetValue(type, oldValue)

		if (keepOldValue && options) {
			if (type === EditorValueType.SELECT) {
				if (!options.find((option) => oldValue === option.value)) {
					unsupportedValues.push(valuesAsText[categoryTitle][key])
					keepOldValue = false
				}
			} else {
				oldValue = (oldValue as EditorValueMultiSelect).filter((value) => {
					if (!options.find((option) => value === option.value)) {
						unsupportedValues.push(valuesAsText[categoryTitle][key])
						return false
					}
					return true
				})
				if (oldValue.length === 0) {
					keepOldValue = false
				}
			}
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
			targetVersionIsKnots: useKnots,
			targetVersion: version,
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
			renderKey++
			return true
		} else {
			return false
		}
	} finally {
		configSwitchIssues = null
	}
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
	renderKey++
}

async function replaceValues(replacementValues: UploadedConfigValues) {
	const newValues: typeof values = {}
	const missingOptions: string[] = []
	const unsupportedValues: string[] = []

	/* 1. construct new completely unset value record */

	forEachConfig(categories, (key, configDefinition) => {
		const { type } = configDefinition
		newValues[key] = unsetValue(type)
	})

	/* 2. assign replacement values and filter out unsupported options/values */

	Object.entries(replacementValues).forEach(([key, valueList]) => {
		const indexEntry = configIndex[key]

		if (!indexEntry) {
			missingOptions.push(key)
			return
		}

		const { type, typeConstraints, options } = indexEntry.config

		// user might have specified the same option multiple times
		// use the last one in case it's not a multi-type option
		const lastProvidedValue = valueList[valueList.length - 1]
		let value: string

		switch (type) {
			case EditorValueType.NUMBER:
				value = lastProvidedValue
				if (isNaN(Number(value)) || (typeConstraints?.wholeNumber && value.includes('.'))) {
					unsupportedValues.push(`${key}=${value}`)
					return
				}
				;(newValues[key] as EditorValueNumber) = Number(value)
				break

			case EditorValueType.CHECKBOX:
				value = lastProvidedValue
				if (!['0', '1'].includes(value)) {
					unsupportedValues.push(`${key}=${value}`)
					return
				}
				;(newValues[key] as EditorValueCheckbox) = value === '1'
				break

			case EditorValueType.SELECT:
				value = lastProvidedValue
				if (options && !options.find((o) => o.value === value)) {
					unsupportedValues.push(`${key}=${value}`)
					return
				}
				;(newValues[key] as EditorValueSelect) = value
				break

			case EditorValueType.MULTI_SELECT:
				if (options) {
					valueList = valueList.filter((value) => {
						if (!options.find((o) => o.value === value)) {
							unsupportedValues.push(`${key}=${value}`)
							return false
						}
						return true
					})
				}
				if (valueList.length === 0) {
					return
				}
				valueList = [...new Set(valueList)] // make each entry unique
				;(newValues[key] as EditorValueMultiText | EditorValueMultiSelect) = valueList
				break

			case EditorValueType.MULTI_TEXT:
				;(newValues[key] as EditorValueMultiText) = valueList
				break

			default:
				value = lastProvidedValue
				;(newValues[key] as EditorValueText) = value
				break
		}
	})

	/* 3. ask user if he wants to proceed in case of conflicts */

	let proceed = Promise.resolve(true)

	if (missingOptions.length > 0 || unsupportedValues.length > 0) {
		const { promise, resolve } = Promise.withResolvers<boolean>()
		proceed = promise
		replaceValuesIssues = {
			targetVersionIsKnots: settingsStore.useKnots,
			targetVersion: settingsStore.currentVersion,
			missingOptions,
			unsupportedValues,
			proceed: resolve, // wait for user to confirm via dialog
		}
	}

	try {
		if (await proceed) {
			values = newValues
			initTextGeneration()
			renderKey++
			return true
		} else {
			return false
		}
	} finally {
		replaceValuesIssues = null
	}
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
		if (settingsStore.explicitDefaults && defaultValue) {
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
	const configSeparator = settingsStore.inlineDescriptors ? '\n\n' : '\n'

	const configsText = Object.entries(category)
		.toSorted(([key1], [key2]) => key1.localeCompare(key2))
		.map(([key, value]) => {
			if (settingsStore.inlineDescriptors) {
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
			(settingsStore.searchTitles && config.title.toLowerCase().includes(search)) ||
			(settingsStore.searchDescriptions && config.description.toLowerCase().includes(search))
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
		replaceValues,
		get configSwitchIssues() {
			return configSwitchIssues
		},
		get replaceValuesIssues() {
			return replaceValuesIssues
		},
		get renderKey() {
			return renderKey
		},
	}
}
