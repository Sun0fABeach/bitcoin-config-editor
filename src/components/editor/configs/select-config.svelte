<script lang="ts">
	import { useId } from 'bits-ui'
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

	let open = $state(false)
	let select: ConfigSelect | null = null
	const containerId = useId()

	const onContainerClick = () => {
		select?.focus()
		open = !open
	}

	const onDeleteClick = (event: MouseEvent) => {
		event.stopPropagation()
		value = unset[EditorValueType.SELECT]
	}
</script>

<div>
	<ConfigContainer {value} {options} {...info} id={containerId} onclick={onContainerClick}>
		<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
			<ConfigSelect bind:open bind:value {items} {containerId} bind:this={select} />
		</InputRow>
	</ConfigContainer>
</div>

<style lang="postcss">
	div {
		display: contents;
		&:hover {
			--select-highlight-border-expansion: 100%;
		}
	}
</style>
