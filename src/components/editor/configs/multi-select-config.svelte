<script lang="ts">
	import { tick } from 'svelte'
	import { useId } from 'bits-ui'
	import { Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
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
	import type { EditorValueMultiSelect } from '@/types/editor'

	type MultiSelectConfigProps = ConfigContainerBaseProps & {
		items: SelectItem[]
	}

	let { key, items, ...info }: MultiSelectConfigProps = $props()

	const configStore = useConfigStore()

	const intialValues = configStore.values[key] as EditorValueMultiSelect
	const options = items.map(({ value }) => value)

	const mappedValues = $state(
		intialValues.length > 0
			? intialValues.map((value) => ({ value, id: useId() }))
			: [{ value: unsetValue(EditorValueType.SELECT), id: useId() }],
	)

	let open = $state(mappedValues.map(() => false))

	const deleteDisabled = $derived(
		mappedValues.length === 1 && mappedValues[0].value === unsetValue(EditorValueType.SELECT),
	)

	const closeAll = () => (open = open.map(() => false))

	const addSelect = async () => {
		mappedValues.push({ value: unsetValue(EditorValueType.SELECT), id: useId() })
		open.push(false)
	}

	const updateSelect = (newValue: SelectItem['value'], rowIdx: number) => {
		mappedValues[rowIdx].value = newValue
		unmapValues()
	}

	const deleteSelect = (rowIdx: number) => {
		if (mappedValues.length === 1) {
			mappedValues[0].value = unsetValue(EditorValueType.SELECT)
		} else {
			mappedValues.splice(rowIdx, 1)
			open.splice(rowIdx, 1)
		}
		unmapValues()
	}

	const unmapValues = () => {
		configStore.updateValue(
			key,
			mappedValues
				.filter(({ value }) => value !== unsetValue(EditorValueType.SELECT))
				.map(({ value }) => value),
		)
	}

	/* event handlers */

	const onAddClick = () => {
		closeAll()
		addSelect()
	}

	const onUpdate = (newValue: SelectItem['value'], rowIdx: number) => {
		updateSelect(newValue, rowIdx)
	}

	const onDeleteClick = async (rowIdx: number) => {
		closeAll()
		await tick() // needed in case select to delete is currently open
		deleteSelect(rowIdx)
	}
</script>

<ConfigContainer {key} value={configStore.values[key]} {options} {...info}>
	<div class="inputs-container">
		{#each mappedValues as { value, id }, rowIdx (id)}
			<InputRow withTransition {deleteDisabled} ondelete={() => onDeleteClick(rowIdx)}>
				<ConfigSelect
					bind:open={open[rowIdx]}
					bind:value={() => value, (v) => onUpdate(v, rowIdx)}
					{items}
				/>
			</InputRow>
		{/each}
		<Button icon noBorder onclick={onAddClick}>
			<Plus />
		</Button>
	</div>
</ConfigContainer>

<style lang="postcss">
	.inputs-container {
		--input-row-gap: 0.75rem;

		display: flex;
		flex-flow: column;

		:global > :last-child {
			align-self: end;
			margin-top: calc(var(--input-row-gap) / 2);
		}
	}
</style>
