<script lang="ts">
	import { tick } from 'svelte'
	import { useId } from 'bits-ui'
	import { Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueMultiText } from '@/types/editor'

	type MultiTextConfigProps = ConfigContainerBaseProps & {
		values: EditorValueMultiText
	}

	let { values = $bindable(), ...info }: MultiTextConfigProps = $props()

	const mappedValues = $state(
		values.length > 0
			? values.map((value) => ({ value, id: useId() }))
			: [{ value: unset[EditorValueType.TEXT], id: useId() }],
	)

	const deleteDisabled = $derived(
		mappedValues.length === 1 && mappedValues[0].value === unset[EditorValueType.TEXT],
	)

	const unmapValues = () => {
		values = mappedValues.filter(({ value }) => value).map(({ value }) => value)
	}

	const inputs: ConfigTextInput[] = $state([])

	const onContainerClick = () => inputs[0].focus()

	const onInputRowClick = (event: MouseEvent, rowIdx: number) => {
		event.stopPropagation()
		inputs[rowIdx].focus()
	}

	const onAddClick = async (event: MouseEvent) => {
		event.stopPropagation()
		mappedValues.push({ value: unset[EditorValueType.TEXT], id: useId() })
		await tick()
		inputs[mappedValues.length - 1].focus()
	}

	const onUpdate = (newValue: string, rowIdx: number) => {
		mappedValues[rowIdx].value = newValue
		unmapValues()
	}

	const onDeleteClick = (event: MouseEvent, rowIdx: number) => {
		event.stopPropagation()
		if (mappedValues.length === 1) {
			mappedValues[0].value = unset[EditorValueType.TEXT]
		} else {
			mappedValues.splice(rowIdx, 1)
		}
		unmapValues()
	}
</script>

<div class="wrapper">
	<ConfigContainer value={values} {...info} onclick={onContainerClick}>
		<div class="inputs-container">
			{#each mappedValues as { value, id }, rowIdx (id)}
				<InputRow
					withTransition
					{deleteDisabled}
					onclick={(e) => onInputRowClick(e, rowIdx)}
					ondelete={(e) => onDeleteClick(e, rowIdx)}
				>
					<ConfigTextInput
						bind:value={() => value, (v) => onUpdate(v, rowIdx)}
						bind:this={inputs[rowIdx]}
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
			--input-highlight-underline-width: 100%;
		}
	}

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
