import v28 from '@/configs/knots/v28.json'
import { unset } from '@/lib/config'
import useOptionsStore from '@/stores/options.svelte'
import useSearchStore from '@/stores/search.svelte'
import { EditorValueType } from '@/enums'
import type { EditorValueAny } from '@/types/editor'
import type { CategoryDefinition, ConfigDefinition } from '@/types/config-definition'

const searchStore = useSearchStore()
const optionsStore = useOptionsStore()

let values = $state<Record<string, EditorValueAny>>({})

const configIndex: Record<
	string,
	{ categoryTitle: CategoryDefinition['title']; config: ConfigDefinition }
> = {}

v28.forEach((category) => {
	Object.entries(category.configs).forEach(([key, configDefinition]) => {
		const type = configDefinition.type as EditorValueType

		switch (type) {
			case EditorValueType.MULTI_TEXT:
			case EditorValueType.MULTI_SELECT:
				values[key] = unset[type]()
				break
			default:
				values[key] = unset[type]
				break
		}

		configIndex[key] = {
			categoryTitle: category.title,
			config: configDefinition,
		}
	})
})

const getCategoryTitle = (key: string) => configIndex[key].categoryTitle
const getConfig = (key: string) => configIndex[key].config

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
		categories: v28 as unknown as CategoryDefinition[],
		get values() {
			return values
		},
		set values(newValues) {
			values = newValues
		},
		get filteredConfigs() {
			return filteredConfigs
		},
		getCategoryTitle,
		getConfig,
	}
}
