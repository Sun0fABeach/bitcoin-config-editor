import { EditorValueType } from '@/enums'

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

export interface ConfigOption {
	value: string
	label: string
}

export interface ConfigDefinition {
	knotsExclusive?: boolean
	type: EditorValueType
	typeConstraints?: TypeConstraints
	title: string
	description: string
	shortDescription?: string
	options?: ConfigOption[]
	defaultValue?: string | Record<string, string>
}

export interface CategoryDefinition {
	knotsExclusive?: boolean
	title: string
	description: string
	configs: Record<string, ConfigDefinition>
}
