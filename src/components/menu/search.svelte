<script lang="ts">
	import { MagnifyingGlass, X } from 'phosphor-svelte'
	import { Label, Button } from 'bits-ui'

	let inputRef: HTMLInputElement
	let searchInput = $state('')
</script>

<div role="button" tabindex="-1" onclick={() => inputRef.focus()} onkeypress={() => {}}>
	<Label.Root for="search">
		{#snippet child({ props })}
			<label {...props}>
				<MagnifyingGlass size={20} weight="regular" />
			</label>
		{/snippet}
	</Label.Root>
	<input
		id="search"
		type="search"
		placeholder="Search"
		bind:value={searchInput}
		bind:this={inputRef}
	/>
	<Button.Root
		class={['clear-button', { hidden: !searchInput }]}
		onclick={() => (searchInput = '')}
	>
		<X size={20} weight="bold" />
	</Button.Root>
</div>

<style lang="postcss">
	div {
		display: inline-flex;
		align-items: center;
		width: 12rem;
		height: 2rem;
		padding-right: 0.125rem;
		border: 1px solid var(--color-element-border);
		border-radius: 0.5rem;
		cursor: pointer;

		&:hover {
			background: var(--color-button-highlight-gradient);
		}
		&:focus-within {
			outline: 1px solid var(--color-element-border);
		}

		> label {
			display: inline-flex;
			align-items: center;
			padding-left: 0.5rem;
			cursor: inherit;
		}

		> input {
			width: 0; /* reset browser defined width */
			flex-grow: 1;
			margin-left: 0.5rem;

			&::placeholder {
				color: var(--color-text-medium);
			}

			&::-webkit-search-cancel-button {
				display: none;
			}
		}

		:global > .clear-button {
			display: inline-flex;
			margin-left: auto;
			padding: 0.375rem;
			background-color: transparent;
		}
		:global > .clear-button.hidden {
			display: none;
		}
	}
</style>
