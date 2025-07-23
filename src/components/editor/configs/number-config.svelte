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
	import type { EditorValueNumber } from '@/types/editor'

	type TextConfigProps = ConfigContainerBaseProps & {
		min?: TypeConstraints['min']
		max?: TypeConstraints['max']
		step?: TypeConstraints['step']
		invalidRange?: TypeConstraints['invalidRange']
		wholeNumber?: TypeConstraints['wholeNumber']
	}

	let {
		key,
		min,
		max,
		step,
		invalidRange,
		wholeNumber = false,
		...info
	}: TextConfigProps = $props()

	const configStore = useConfigStore()

	const value = $derived(configStore.values[key]) as EditorValueNumber

	const onDeleteClick = () => {
		configStore.updateValue(key, unsetValue(EditorValueType.NUMBER))
	}
</script>

<ConfigContainer {key} {value} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		<ConfigTextInput
			{min}
			{max}
			{step}
			{invalidRange}
			{wholeNumber}
			bind:value={() => value, (v) => configStore.updateValue(key, v)}
		/>
	</InputRow>
</ConfigContainer>
