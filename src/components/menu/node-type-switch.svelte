<script lang="ts">
	import { Switch, Label } from 'bits-ui'
	import KnotsLogo from '@/assets/knots-logo.png'

	const id = 'node-type-switch'

	let checked = $state(true)
	const label = $derived(checked ? 'Knots' : 'Core')
</script>

<div class="node-type-switch-container">
	<Switch.Root bind:checked {id}>
		{#snippet child({ props })}
			<button {...props} class="node-type-switch-root">
				<Switch.Thumb>
					{#snippet child({ props })}
						<span {...props} class="node-type-switch-thumb">
							<img src={KnotsLogo} alt="Knots logo" />
						</span>
					{/snippet}
				</Switch.Thumb>
			</button>
		{/snippet}
	</Switch.Root>

	<Label.Root for={id}>
		{#snippet child({ props })}
			<label {...props} class="node-type-switch-label">{label}</label>
		{/snippet}
	</Label.Root>
</div>

<style lang="postcss">
	.node-type-switch-container {
		display: flex;

		&:hover .node-type-switch-root {
			background: var(--color-button-highlight-gradient);
		}
	}

	.node-type-switch-root {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 2rem;
		border: 2px solid var(--color-text-medium);
		border-radius: 1rem;
		background-color: var(--color-background);
		cursor: pointer;
	}

	.node-type-switch-thumb {
		display: inline-flex;
		width: 1.75rem;
		height: 1.75rem;
		background-color: black;
		border-radius: 50%;
		transition: transform 0.3s;
		> img {
			background-color: var(----color-background);
			transition: filter 0.6s;
		}

		&[data-state='checked'] {
			transform: translate(1rem);
		}
		&[data-state='unchecked'] {
			transform: translate(-1rem);
			> img {
				filter: grayscale(100%);
			}
		}
	}

	.node-type-switch-label {
		display: inline-flex;
		align-items: center;
		width: 3.5rem; /* keep text width stable when switching between "Core" and "Knots" */
		padding: 0 0.375rem;
		font-weight: 500;
		cursor: pointer;
	}
</style>
