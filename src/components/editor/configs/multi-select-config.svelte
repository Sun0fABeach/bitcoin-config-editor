<script lang="ts">
	import { tick } from 'svelte'
	import { slide } from 'svelte/transition'
	import { useId } from 'bits-ui'
	import { Trash, Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import ConfigSelect, {
		placeholderItem,
		type SelectItem,
	} from '@/components/editor/config-select.svelte'

	type MultiSelectConfigProps = ConfigContainerBaseProps & {
		items: SelectItem[]
		values: SelectItem['value'][]
	}

	let { items, values = $bindable([]), ...info }: MultiSelectConfigProps = $props()

	const mappedValues = $state(
		values.length > 0
			? values.map((value) => ({ value, id: useId() }))
			: [{ value: placeholderItem.value, id: useId() }],
	)

	let open = $state(mappedValues.map(() => false))

	const deleteDisabled = $derived(
		mappedValues.length === 1 && mappedValues[0].value === placeholderItem.value,
	)

	const containerId = useId()

	const closeAll = () => (open = open.map(() => false))

	const addSelect = () => {
		mappedValues.push({ value: placeholderItem.value, id: useId() })
		open.push(false)
	}

	const updateSelect = (newValue: SelectItem['value'], rowIdx: number) => {
		mappedValues[rowIdx].value = newValue
		unmapValues()
	}

	const deleteSelect = (rowIdx: number) => {
		if (mappedValues.length === 1) {
			mappedValues[0].value = placeholderItem.value
		} else {
			mappedValues.splice(rowIdx, 1)
			open.splice(rowIdx, 1)
		}
		unmapValues()
	}

	const unmapValues = () => {
		values = mappedValues
			.filter(({ value }) => value !== placeholderItem.value)
			.map(({ value }) => value)
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
	<ConfigContainer value={values} {...info} id={containerId} onclick={onContainerClick}>
		<div class="inputs-container">
			{#each mappedValues as { value, id }, rowIdx (id)}
				<div
					class="input-row"
					role="button"
					tabindex="-1"
					transition:slide
					onclick={onInputRowClick}
					onkeypress={() => {}}
				>
					<ConfigSelect
						bind:open={open[rowIdx]}
						bind:value={() => value, (v) => onUpdate(v, rowIdx)}
						{items}
						{containerId}
					/>
					<Button
						icon
						noBorder
						disabled={deleteDisabled}
						onclick={(e: MouseEvent) => onDeleteClick(e, rowIdx)}
					>
						<Trash weight="light" />
					</Button>
				</div>
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
		--row-gap: 0.75rem;

		display: flex;
		flex-direction: column;

		> .input-row {
			display: flex;
			column-gap: 0.75rem;
			padding: calc(var(--row-gap) / 2) 0;

			/* double :first-child b/c config-select is nested inside "display: contents" wrapper */
			:global > :first-child > :first-child {
				flex-grow: 1;
			}

			:global > :last-child:disabled {
				color: var(--color-text-medium);
				pointer-events: none;
			}
		}

		:global > :last-child {
			align-self: flex-end;
			margin-top: calc(var(--row-gap) / 2);
		}
	}
</style>
