import type { EditorValueAny } from '@/types/editor'

export interface ConfigDefinition {
	type: EditorValueAny
	typeConstraints?: {
		min?: number
		max?: number
		invalidRange?: [number, number]
		wholeNumber?: boolean
		minLength?: number
		maxLength?: number
		hex?: boolean
	}
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
