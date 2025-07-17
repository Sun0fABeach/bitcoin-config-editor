<script lang="ts">
	import { tick } from 'svelte'
	import { useId } from 'bits-ui'
	import { Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/configs/inputs/input-row.svelte'
	import ConfigTextInput from '@/components/editor/configs/inputs/config-text-input.svelte'
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

	const onAddClick = async () => {
		mappedValues.push({ value: unset[EditorValueType.TEXT], id: useId() })
		await tick()
		inputs[mappedValues.length - 1].focus()
	}

	const onUpdate = (newValue: string, rowIdx: number) => {
		mappedValues[rowIdx].value = newValue
		unmapValues()
	}

	const onDeleteClick = (rowIdx: number) => {
		if (mappedValues.length === 1) {
			mappedValues[0].value = unset[EditorValueType.TEXT]
		} else {
			mappedValues.splice(rowIdx, 1)
		}
		unmapValues()
	}
</script>

<ConfigContainer value={values} {...info}>
	<div class="inputs-container">
		{#each mappedValues as { value, id }, rowIdx (id)}
			<InputRow withTransition {deleteDisabled} ondelete={() => onDeleteClick(rowIdx)}>
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
