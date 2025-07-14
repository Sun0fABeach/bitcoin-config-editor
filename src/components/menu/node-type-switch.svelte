<script lang="ts">
	import { Switch, Label } from 'bits-ui'
	import KnotsLogo from '@/components/knots-logo.svelte'

	const id = 'node-type-switch'

	let checked = $state(true)
	const label = $derived(checked ? 'Knots' : 'Core')
</script>

<div class="container" title="Select whether you run a Core or Knots node">
	<Switch.Root bind:checked {id}>
		{#snippet child({ props })}
			<button {...props}>
				<Switch.Thumb>
					{#snippet child({ props })}
						<span {...props} class="knob">
							<KnotsLogo greyedOut={!checked} />
						</span>
					{/snippet}
				</Switch.Thumb>
			</button>
		{/snippet}
	</Switch.Root>

	<Label.Root for={id}>
		{#snippet child({ props })}
			<label {...props}>{label}</label>
		{/snippet}
	</Label.Root>
</div>

<style lang="postcss">
	.container {
		display: flex;

		&:hover button {
			background: var(--color-button-highlight-gradient);
		}
	}

	button {
		display: inline flex;
		justify-content: center;
		width: 4rem;
		height: 2rem;
		border: 2px solid var(--color-element-border);
		border-radius: 1rem;
		background-color: var(--color-background);
	}

	.knob {
		display: inline flex;
		width: 1.75rem;
		height: 1.75rem;
		background-color: black;
		border-radius: 50%;
		transition: transform 0.3s;

		&[data-state='checked'] {
			transform: translate(1rem);
		}
		&[data-state='unchecked'] {
			transform: translate(-1rem);
		}
	}

	label {
		display: inline flex;
		align-items: center;
		width: 3.5rem; /* keep text width stable when switching between "Core" and "Knots" */
		padding: 0 0.375rem;
		font-weight: 500;
		cursor: pointer;
	}
</style>
