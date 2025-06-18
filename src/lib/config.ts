export interface EditorValue {
	text: string
	checkbox: boolean | null
	select: string
	multiText: EditorValue['text'][]
	multiSelect: EditorValue['select'][]
}

export type EditorValueAny =
	| EditorValue['text']
	| EditorValue['checkbox']
	| EditorValue['select']
	| EditorValue['multiText']
	| EditorValue['multiSelect']

export const unset: {
	text: EditorValue['text']
	checkbox: EditorValue['checkbox']
	select: EditorValue['select']
	multiText: () => EditorValue['multiText']
	multiSelect: () => EditorValue['multiSelect']
} = {
	text: '',
	checkbox: null,
	select: '',
	multiText: () => [],
	multiSelect: () => [],
}
