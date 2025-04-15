<script lang="ts">
	import { MagnifyingGlass } from 'phosphor-svelte'
	let searchInput = $state('')
</script>

<div>
	<label for="search">
		<MagnifyingGlass size={20} weight="regular" />
	</label>
	<input id="search" type="search" placeholder="Search" bind:value={searchInput} />
</div>

<style lang="postcss">
	div {
		display: inline-flex;
		column-gap: 0.5rem;
		height: 2rem;
		padding-right: 0.5rem;
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
			width: 8rem;
			border: 0;
			background-color: transparent;
			color: var(--color-text-light);

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
	}
</style>
