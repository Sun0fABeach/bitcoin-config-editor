import type { EditorValueAny } from '@/types/editor'

export interface TypeConstraints {
	min?: number
	max?: number
	step?: number
	invalidRange?: [number, number]
	wholeNumber?: boolean
	hex?: boolean
	base58?: boolean
	minLength?: number
	maxLength?: number
}

export interface ConfigDefinition {
	type: EditorValueAny
	typeConstraints?: TypeConstraints
	title: string
	description: string
	shortDescription?: string
	options?: {
		value: string
		label: string
	}[]
	defaultValue?: string | Record<string, string>
}

export interface CategoryDefinition {
	title: string
	description: string
	configs: Record<string, ConfigDefinition>
}
