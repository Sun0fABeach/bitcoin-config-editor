import { EditorValueType } from '@/enums'
import type {
	EditorValueText,
	EditorValueNumber,
	EditorValueCheckbox,
	EditorValueSelect,
	EditorValueMultiText,
	EditorValueMultiSelect,
	EditorValueAny,
} from '@/types/editor'

interface TypeMap {
	[EditorValueType.TEXT]: EditorValueText
	[EditorValueType.NUMBER]: EditorValueNumber
	[EditorValueType.CHECKBOX]: EditorValueCheckbox
	[EditorValueType.SELECT]: EditorValueSelect
	[EditorValueType.MULTI_TEXT]: EditorValueMultiText
	[EditorValueType.MULTI_SELECT]: EditorValueMultiSelect
}

export function unsetValue<T extends keyof TypeMap>(type: T): TypeMap[T] {
	switch (type) {
		case EditorValueType.TEXT:
			return '' as TypeMap[T]
		case EditorValueType.NUMBER:
			return null as TypeMap[T]
		case EditorValueType.CHECKBOX:
			return null as TypeMap[T]
		case EditorValueType.SELECT:
			return '' as TypeMap[T]
		case EditorValueType.MULTI_TEXT:
			return [] as unknown as TypeMap[T]
		case EditorValueType.MULTI_SELECT:
			return [] as unknown as TypeMap[T]
	}
}

export function isUnsetValue(type: EditorValueType, value: EditorValueAny) {
	switch (type) {
		case EditorValueType.MULTI_TEXT:
		case EditorValueType.MULTI_SELECT:
			return (value as unknown[]).length === 0
		default:
			return value === unsetValue(type)
	}
}
