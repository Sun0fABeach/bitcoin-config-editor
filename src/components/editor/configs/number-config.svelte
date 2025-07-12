<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueNumber } from '@/types/editor'
	import type { TypeConstraints } from '@/types/config-definition'

	type TextConfigProps = ConfigContainerBaseProps & {
		value: EditorValueNumber
		min?: TypeConstraints['min']
		max?: TypeConstraints['max']
		step?: TypeConstraints['step']
		invalidRange?: TypeConstraints['invalidRange']
		wholeNumber?: TypeConstraints['wholeNumber']
	}

	let {
		value = $bindable(),
		min,
		max,
		step,
		invalidRange,
		wholeNumber = false,
		...info
	}: TextConfigProps = $props()

	const onDeleteClick = () => {
		value = unset[EditorValueType.NUMBER]
	}
</script>

<ConfigContainer {value} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		<ConfigTextInput {min} {max} {step} {invalidRange} {wholeNumber} bind:value />
	</InputRow>
</ConfigContainer>
