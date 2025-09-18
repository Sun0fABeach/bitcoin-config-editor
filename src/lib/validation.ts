import type { TypeConstraints } from '@/types/config-definition'
import type { EditorValueText, EditorValueNumber } from '@/types/editor'

type ValueType = EditorValueText | EditorValueNumber

export const hexPattern = '^[0-9a-fA-F]+$'
export const base58Pattern = '^[1-9a-km-zA-HJ-NP-Z]+$'

export default function (value: ValueType, constraints: TypeConstraints) {
	if (value === '' || value === null) {
		return []
	}
	if (typeof value === 'string') {
		return validateTextValue(value, constraints)
	} else {
		return validateNumberValue(value, constraints)
	}
}

function validateTextValue(
	value: EditorValueText,
	{ hex, base58, minLength, maxLength }: TypeConstraints,
) {
	if (value === '') {
		return []
	}

	const errorMessages: string[] = []

	if (hex !== undefined && !value.match(hexPattern)) {
		errorMessages.push('Must be in hex format')
	}

	if (base58 !== undefined && !value.match(base58Pattern)) {
		errorMessages.push('Must be in base58 format')
	}

	if (minLength !== undefined && value.length < minLength) {
		errorMessages.push(`Must have at least ${minLength} characters`)
	}

	if (maxLength !== undefined && value.length > maxLength) {
		errorMessages.push(`Must have at most ${maxLength} characters`)
	}

	return errorMessages
}

function validateNumberValue(
	value: EditorValueNumber,
	{ min, max, step, invalidRange, wholeNumber }: TypeConstraints,
) {
	if (value === null) {
		return []
	}

	const errorMessages: string[] = []

	if (min !== undefined && value < min) {
		errorMessages.push(`Value must be at least ${min}`)
	}

	if (max !== undefined && value > max) {
		errorMessages.push(`Value must be at most ${max}`)
	}

	if (step !== undefined) {
		if (step >= 1) {
			if (value % step !== 0) {
				errorMessages.push(`Value must be an increment of ${step}`)
			}
		} else {
			if ((value - Math.floor(value)) % step !== 0) {
				errorMessages.push(`Value must be an increment of ${step}`)
			}
		}
	}

	if (invalidRange !== undefined && value >= invalidRange[0] && value <= invalidRange[1]) {
		errorMessages.push(`Value can't be between ${invalidRange[0] - 1} and ${invalidRange[1] + 1}`)
	}

	if (wholeNumber !== undefined && value !== Math.trunc(value)) {
		errorMessages.push('Value must be a whole number')
	}

	return errorMessages
}
