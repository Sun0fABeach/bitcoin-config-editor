<script lang="ts">
	import { slide } from 'svelte/transition'
	import { useId } from 'bits-ui'
	import { Trash, Plus } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import ConfigContainer from '@/components/editor/configs/config-container.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'

	export type MultiTextEntry = {
		id: string
		text: string
	}

	interface MultiTextConfigProps {
		title: string
		key: string
		description: string
		entries: MultiTextEntry[]
	}

	let { entries = $bindable(), ...info }: MultiTextConfigProps = $props()

	const deleteDisabled = $derived(entries.length === 1 && !entries[0].text)

	const inputs: ConfigTextInput[] = $state([])

	const onContainerClick = () => inputs[0].focus()

	const onInputRowClick = (event: MouseEvent, idx: number) => {
		event.stopPropagation()
		inputs[idx].focus()
	}

	const onAddClick = (event: MouseEvent) => {
		event.stopPropagation()
		entries.push({ id: useId(), text: '' })
	}

	const onDeleteClick = (event: MouseEvent, idx: number) => {
		event.stopPropagation()

		if (entries.length > 1) {
			entries.splice(idx, 1)
		} else {
			entries[idx].text = ''
		}
	}
</script>

<div class="wrapper">
	<ConfigContainer {...info} onclick={onContainerClick}>
		<div class="inputs-container">
			{#each entries as { id }, idx (id)}
				<div
					class="input-row"
					role="button"
					tabindex="-1"
					transition:slide
					onclick={(e) => onInputRowClick(e, idx)}
					onkeypress={() => {}}
				>
					<ConfigTextInput bind:value={entries[idx].text} bind:this={inputs[idx]} />
					<Button
						icon
						noBorder
						disabled={deleteDisabled}
						onclick={(e: MouseEvent) => onDeleteClick(e, idx)}
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
				pointer-events: none;
				color: var(--color-text-medium);
			}
		}

		:global > :last-child {
			align-self: flex-end;
			margin-top: calc(var(--row-gap) / 2);
		}
	}
</style>
