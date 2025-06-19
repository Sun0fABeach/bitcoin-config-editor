import { EditorValueType } from '@/enums'
import type {
	EditorValueText,
	EditorValueNumber,
	EditorValueCheckbox,
	EditorValueSelect,
	EditorValueMultiText,
	EditorValueMultiSelect,
} from '@/types/editor'

export const unset: {
	[EditorValueType.TEXT]: EditorValueText
	[EditorValueType.NUMBER]: EditorValueNumber
	[EditorValueType.CHECKBOX]: EditorValueCheckbox
	[EditorValueType.SELECT]: EditorValueSelect
	[EditorValueType.MULTI_TEXT]: () => EditorValueMultiText
	[EditorValueType.MULTI_SELECT]: () => EditorValueMultiSelect
} = {
	[EditorValueType.TEXT]: '',
	[EditorValueType.NUMBER]: null,
	[EditorValueType.CHECKBOX]: null,
	[EditorValueType.SELECT]: '',
	[EditorValueType.MULTI_TEXT]: () => [],
	[EditorValueType.MULTI_SELECT]: () => [],
}
