<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/configs/inputs/input-row.svelte'
	import ConfigCheckbox from '@/components/editor/configs/inputs/config-checkbox.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { unsetValue } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueCheckbox } from '@/types/editor'

	type CheckConfigProps = ConfigContainerBaseProps

	let { key, ...info }: CheckConfigProps = $props()

	const configStore = useConfigStore()

	const value = $derived(configStore.values[key]) as EditorValueCheckbox

	const onDeleteClick = () => {
		configStore.updateValue(key, unsetValue(EditorValueType.CHECKBOX))
	}
</script>

<ConfigContainer {key} {value} {...info}>
	<InputRow
		deleteDisabled={value === unsetValue(EditorValueType.CHECKBOX)}
		ondelete={onDeleteClick}
	>
		<ConfigCheckbox bind:checked={() => value, (v) => configStore.updateValue(key, v)} />
	</InputRow>
</ConfigContainer>
