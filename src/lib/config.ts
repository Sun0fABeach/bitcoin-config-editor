export interface EditorValue {
	text: string
	number: number | null
	checkbox: boolean | null
	select: string
	multiText: EditorValue['text'][]
	multiSelect: EditorValue['select'][]
}

export type EditorValueAny =
	| EditorValue['text']
	| EditorValue['number']
	| EditorValue['checkbox']
	| EditorValue['select']
	| EditorValue['multiText']
	| EditorValue['multiSelect']

export const unset: {
	text: EditorValue['text']
	number: EditorValue['number']
	checkbox: EditorValue['checkbox']
	select: EditorValue['select']
	multiText: () => EditorValue['multiText']
	multiSelect: () => EditorValue['multiSelect']
} = {
	text: '',
	number: null,
	checkbox: null,
	select: '',
	multiText: () => [],
	multiSelect: () => [],
}
