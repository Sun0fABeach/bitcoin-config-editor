<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/configs/inputs/input-row.svelte'
	import ConfigTextInput from '@/components/editor/configs/inputs/config-text-input.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { unsetValue } from '@/lib/editor'
	import { EditorValueType } from '@/enums'
	import type { TypeConstraints } from '@/types/config-definition'
	import type { EditorValueText } from '@/types/editor'

	type TextConfigProps = ConfigContainerBaseProps &
		Pick<TypeConstraints, 'hex' | 'base58' | 'minLength' | 'maxLength'>

	let { key, hex, base58, minLength, maxLength, ...info }: TextConfigProps = $props()

	const configStore = useConfigStore()

	const value = $derived(configStore.values[key]) as EditorValueText

	const onDeleteClick = () => {
		configStore.updateValue(key, unsetValue(EditorValueType.TEXT))
	}
</script>

<ConfigContainer {key} {value} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		<ConfigTextInput
			{hex}
			{base58}
			{minLength}
			{maxLength}
			bind:value={() => value, (v) => configStore.updateValue(key, v)}
		/>
	</InputRow>
</ConfigContainer>
