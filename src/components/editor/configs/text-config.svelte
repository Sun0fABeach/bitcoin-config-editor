<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueText } from '@/types/editor'
	import type { TypeConstraints } from '@/types/config-definition'

	type TextConfigProps = ConfigContainerBaseProps & {
		value: EditorValueText
		hex?: TypeConstraints['hex']
		base58?: TypeConstraints['base58']
		minLength?: TypeConstraints['minLength']
		maxLength?: TypeConstraints['maxLength']
	}

	let {
		value = $bindable(),
		hex,
		base58,
		minLength,
		maxLength,
		...info
	}: TextConfigProps = $props()

	const onDeleteClick = () => {
		value = unset[EditorValueType.TEXT]
	}
</script>

<ConfigContainer {value} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		{@const pattern = hex ? '[0-9a-fA-F]+' : base58 ? '[1-9a-km-zA-HJ-NP-Z]+' : undefined}
		<ConfigTextInput {pattern} minlength={minLength} maxlength={maxLength} bind:value />
	</InputRow>
</ConfigContainer>
