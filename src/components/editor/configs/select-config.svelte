<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigSelect, { type SelectItem } from '@/components/editor/config-select.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueSelect } from '@/types/editor'

	type SelectConfigProps = ConfigContainerBaseProps & {
		items: SelectItem[]
		value: EditorValueSelect
	}

	let { items, value = $bindable(), ...info }: SelectConfigProps = $props()

	const options = items.map(({ value }) => value)

	const onDeleteClick = () => {
		value = unset[EditorValueType.SELECT]
	}
</script>

<ConfigContainer {value} {options} {...info}>
	<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
		<ConfigSelect bind:value {items} />
	</InputRow>
</ConfigContainer>
