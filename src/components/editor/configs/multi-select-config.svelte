<script lang="ts">
	import { tick } from 'svelte'
	import { useId } from 'bits-ui'
	import { Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigSelect, { type SelectItem } from '@/components/editor/config-select.svelte'
	import { unset, type EditorValue } from '@/lib/config'

	type MultiSelectConfigProps = ConfigContainerBaseProps & {
		items: SelectItem[]
		values: EditorValue['multiSelect']
	}

	let { items, values = $bindable(unset.multiSelect()), ...info }: MultiSelectConfigProps = $props()

	const options = items.map(({ value }) => value)

	const mappedValues = $state(
		values.length > 0
			? values.map((value) => ({ value, id: useId() }))
			: [{ value: unset.select, id: useId() }],
	)

	let open = $state(mappedValues.map(() => false))

	const deleteDisabled = $derived(
		mappedValues.length === 1 && mappedValues[0].value === unset.select,
	)

	const containerId = useId()
	const selects: ConfigSelect[] = $state([])

	const closeAll = () => (open = open.map(() => false))

	const addSelect = async () => {
		mappedValues.push({ value: unset.select, id: useId() })
		open.push(false)
		await tick()
		selects[mappedValues.length - 1].focus()
	}

	const updateSelect = (newValue: SelectItem['value'], rowIdx: number) => {
		mappedValues[rowIdx].value = newValue
		unmapValues()
	}

	const deleteSelect = (rowIdx: number) => {
		if (mappedValues.length === 1) {
			mappedValues[0].value = unset.select
		} else {
			mappedValues.splice(rowIdx, 1)
			open.splice(rowIdx, 1)
		}
		unmapValues()
	}

	const unmapValues = () => {
		values = mappedValues.filter(({ value }) => value !== unset.select).map(({ value }) => value)
	}

	/* event handlers */

	const onContainerClick = () => {
		const openIndex = open.findIndex((isOpen) => isOpen)
		if (openIndex !== -1) {
			open[openIndex] = false
		} else {
			open[0] = true
		}
	}

	const onInputRowClick = (event: MouseEvent) => {
		// UX tweak: do nothing when user (mis-)clicks gap between select and delete icon
		event.stopPropagation()
	}

	const onAddClick = async (event: MouseEvent) => {
		event.stopPropagation()
		closeAll()
		addSelect()
	}

	const onUpdate = (newValue: SelectItem['value'], rowIdx: number) => {
		updateSelect(newValue, rowIdx)
	}

	const onDeleteClick = async (event: MouseEvent, rowIdx: number) => {
		event.stopPropagation()
		closeAll()
		await tick() // needed in case select to delete is currently open
		deleteSelect(rowIdx)
	}
</script>

<div class="wrapper">
	<ConfigContainer value={values} {options} {...info} id={containerId} onclick={onContainerClick}>
		<div class="inputs-container">
			{#each mappedValues as { value, id }, rowIdx (id)}
				<InputRow
					withTransition
					{deleteDisabled}
					onclick={onInputRowClick}
					ondelete={(e) => onDeleteClick(e, rowIdx)}
				>
					<ConfigSelect
						bind:open={open[rowIdx]}
						bind:value={() => value, (v) => onUpdate(v, rowIdx)}
						{items}
						{containerId}
						bind:this={selects[rowIdx]}
					/>
				</InputRow>
			{/each}
			<Button icon noBorder onclick={onAddClick}>
				<Plus />
			</Button>
		</div>
	</ConfigContainer>
</div>

<style lang="postcss">
	.wrapper {
		display: contents;
		&:hover {
			--select-highlight-border-expansion: 100%;
		}
	}

	.inputs-container {
		--input-row-gap: 0.75rem;

		display: flex;
		flex-direction: column;

		:global > :last-child {
			align-self: flex-end;
			margin-top: calc(var(--input-row-gap) / 2);
		}
	}
</style>
