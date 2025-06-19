import v28 from '@/configs/knots/v28.json'
import { unset } from '@/lib/config'
import { EditorValueType } from '@/enums'
import type { EditorValueAny } from '@/types/editor'
import type { CategoryDefinition } from '@/types/config-definition'

let values = $state<Record<string, EditorValueAny>>({})

v28.forEach((category) => {
	Object.entries(category.configs).forEach(([key, definition]) => {
		const type = definition.type as EditorValueType

		switch (type) {
			case EditorValueType.MULTI_TEXT:
			case EditorValueType.MULTI_SELECT:
				values[key] = unset[type]()
				break
			default:
				values[key] = unset[type]
				break
		}
	})
})

export default function () {
	return {
		categories: v28 as CategoryDefinition[],
		get values() {
			return values
		},
		set values(newValues) {
			values = newValues
		},
	}
}
