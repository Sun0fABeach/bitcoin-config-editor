<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/configs/inputs/input-row.svelte'
	import ConfigTextInput from '@/components/editor/configs/inputs/config-text-input.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { unsetValue } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { TypeConstraints } from '@/types/config-definition'
	import type { EditorValueText } from '@/types/editor'

	type TextConfigProps = ConfigContainerBaseProps & {
		hex?: TypeConstraints['hex']
		base58?: TypeConstraints['base58']
		minLength?: TypeConstraints['minLength']
		maxLength?: TypeConstraints['maxLength']
	}

	let { key, hex, base58, minLength, maxLength, ...info }: TextConfigProps = $props()

	const configStore = useConfigStore()

	const value = $derived(configStore.values[key]) as EditorValueText

	const onDeleteClick = () => {
		configStore.updateValue(key, unsetValue(EditorValueType.TEXT))
	}
</script>

<ConfigContainer {key} {value} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		{@const pattern = hex ? '[0-9a-fA-F]+' : base58 ? '[1-9a-km-zA-HJ-NP-Z]+' : undefined}
		<ConfigTextInput
			{pattern}
			minlength={minLength}
			maxlength={maxLength}
			bind:value={() => value, (v) => configStore.updateValue(key, v)}
		/>
	</InputRow>
</ConfigContainer>
