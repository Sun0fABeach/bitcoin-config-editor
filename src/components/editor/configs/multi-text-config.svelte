<script lang="ts">
	import { tick } from 'svelte'
	import { slide } from 'svelte/transition'
	import { useId } from 'bits-ui'
	import { Trash, Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'

	export type MultiTextEntry = {
		id: string
		text: string
	}

	type MultiTextConfigProps = ConfigContainerBaseProps & {
		entries: MultiTextEntry[]
	}

	let { entries = $bindable(), ...info }: MultiTextConfigProps = $props()

	const deleteDisabled = $derived(entries.length === 1 && !entries[0].text)

	const inputs: ConfigTextInput[] = $state([])

	const onContainerClick = () => inputs[0].focus()

	const onInputRowClick = (event: MouseEvent, rowIdx: number) => {
		event.stopPropagation()
		inputs[rowIdx].focus()
	}

	const onAddClick = async (event: MouseEvent) => {
		event.stopPropagation()
		entries.push({ id: useId(), text: '' })
		await tick()
		inputs[entries.length - 1].focus()
	}

	const onDeleteClick = (event: MouseEvent, rowIdx: number) => {
		event.stopPropagation()

		if (entries.length > 1) {
			entries.splice(rowIdx, 1)
		} else {
			entries[0].text = ''
		}
	}
</script>

<div class="wrapper">
	<ConfigContainer {...info} onclick={onContainerClick}>
		<div class="inputs-container">
			{#each entries as { id }, rowIdx (id)}
				<div
					class="input-row"
					role="button"
					tabindex="-1"
					transition:slide
					onclick={(e) => onInputRowClick(e, rowIdx)}
					onkeypress={() => {}}
				>
					<ConfigTextInput bind:value={entries[rowIdx].text} bind:this={inputs[rowIdx]} />
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
			--input-highlight-underline-width: 100%;
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

			:global > :first-child {
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
