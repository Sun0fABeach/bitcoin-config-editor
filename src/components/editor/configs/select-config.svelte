<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/configs/inputs/input-row.svelte'
	import ConfigSelect, {
		type SelectItem,
	} from '@/components/editor/configs/inputs/config-select.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { unsetValue } from '@/lib/editor'
	import { EditorValueType } from '@/enums'
	import type { EditorValueSelect } from '@/types/editor'

	type SelectConfigProps = ConfigContainerBaseProps & {
		items: SelectItem[]
	}

	let { key, items, ...info }: SelectConfigProps = $props()

	const configStore = useConfigStore()

	const value = $derived(configStore.values[key]) as EditorValueSelect

	const options = items.map(({ value }) => value)

	const onDeleteClick = () => {
		configStore.updateValue(key, unsetValue(EditorValueType.SELECT))
	}
</script>

<ConfigContainer {key} {value} {options} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		<ConfigSelect bind:value={() => value, (v) => configStore.updateValue(key, v)} {items} />
	</InputRow>
</ConfigContainer>
