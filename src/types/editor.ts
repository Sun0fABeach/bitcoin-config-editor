export type EditorValueText = string
export type EditorValueNumber = number | null
export type EditorValueCheckbox = boolean | null
export type EditorValueSelect = string
export type EditorValueMultiText = EditorValueText[]
export type EditorValueMultiSelect = EditorValueSelect[]

export type EditorValueAny =
	| EditorValueText
	| EditorValueNumber
	| EditorValueCheckbox
	| EditorValueSelect
	| EditorValueMultiText
	| EditorValueMultiSelect
