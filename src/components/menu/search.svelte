<script lang="ts">
	import { MagnifyingGlass, X } from 'phosphor-svelte'

	let inputRef: HTMLInputElement
	let searchInput = $state('')

	const clearInput = () => {
		searchInput = ''
		inputRef.focus()
	}
</script>

<div>
	<label for="search">
		<MagnifyingGlass size={20} weight="regular" />
	</label>
	<input
		id="search"
		type="search"
		placeholder="Search"
		bind:value={searchInput}
		bind:this={inputRef}
	/>
	<button style:display={searchInput ? 'inline-flex' : 'none'} onclick={clearInput}>
		<X size={20} weight="bold" />
	</button>
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
		}

		> input {
			width: 0; /* reset browser defined width */
			flex-grow: 1;
			margin-left: 0.5rem;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: var(--color-text-medium);
			}

			&::-webkit-search-cancel-button {
				display: none;
			}
		}

		> button {
			margin-left: auto;
			padding: 0.375rem;
			background-color: transparent;
		}
	}
</style>
