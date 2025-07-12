import v28 from '@/configs/knots/v28.json'
import { unset } from '@/lib/config'
import { EditorValueType } from '@/enums'
import type { EditorValueAny } from '@/types/editor'
import type { CategoryDefinition, ConfigDefinition } from '@/types/config-definition'

let values = $state<Record<string, EditorValueAny>>({})

const configIndex: Record<
	string,
	{ category: CategoryDefinition['title']; config: ConfigDefinition }
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
			category: category.title,
			config: configDefinition,
		}
	})
})

export default function () {
	return {
		// cast to unknown first to get rid of cryptic TS error
		categories: v28 as unknown as CategoryDefinition[],
		configIndex,
		get values() {
			return values
		},
		set values(newValues) {
			values = newValues
		},
	}
}
