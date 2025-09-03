<script lang="ts">
	import { Button } from 'bits-ui'
	import { X } from 'phosphor-svelte'
	import Dialog from './dialog.svelte'
	import useSearchStore from '@/stores/search.svelte'

	interface SearchDialogProps {
		open?: boolean
	}

	let { open = $bindable(false) }: SearchDialogProps = $props()

	const searchStore = useSearchStore()

	let search = $state('')
	let inputRef: HTMLInputElement

	$effect(() => {
		if (open) {
			search = searchStore.search
		}
	})

	const onConfirm = () => {
		searchStore.search = search
		open = false
	}

	const clear = () => {
		search = ''
		inputRef.focus()
	}
</script>

<Dialog
	bind:open
	syncWithPageState
	title="Search config options"
	cancelText="Cancel"
	confirmText="Search"
	{onConfirm}
	onIntroEnd={() => inputRef.focus()}
>
	{#snippet description()}
		<div>
			<input
				type="search"
				placeholder="Search"
				bind:this={inputRef}
				bind:value={search}
				onkeypress={(e) => e.key === 'Enter' && onConfirm()}
			/>
			<Button.Root class={['clear-button', { hidden: !search }]} onclick={clear}>
				<X size={20} weight="bold" />
			</Button.Root>
		</div>
	{/snippet}
</Dialog>

<style lang="postcss">
	div {
		display: inline flex;
		align-items: center;
		height: 2.125rem;
		margin-top: 0.25rem;
		padding-left: 0.5rem;
		background-color: var(--color-background);
		border: 1px solid var(--color-element-border);
		border-radius: 0.25rem;

		@media (min-width: 550px) {
			width: 16rem;
		}

		> input {
			width: 0; /* reset browser defined width */
			flex: 1;
			font-size: 1.25rem;

			&::placeholder {
				color: var(--color-text-medium);
			}
		}

		:global > .clear-button {
			display: inline flex;
			padding: 0.375rem 0.5rem 0.375rem 0.375rem;
		}
		:global > .clear-button.hidden {
			display: none;
		}
	}
</style>
