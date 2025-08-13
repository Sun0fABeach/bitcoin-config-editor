<script lang="ts">
	import { Switch, Label } from 'bits-ui'
	import useOptionsStore from '@/stores/options.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import KnotsLogo from '@/components/knots-logo.svelte'
	import Dialog from '@/components/dialog.svelte'

	const id = 'node-type-switch'

	const optionsStore = useOptionsStore()
	const configStore = useConfigStore()

	const label = $derived(optionsStore.useKnots ? 'Knots' : 'Core')
	const version = $derived(optionsStore.currentVersion)

	const confirmDialogOpen = $derived(!!configStore.proceedWithConfigSwitch)
	const abortSwitch = () => configStore.proceedWithConfigSwitch?.(false)
	const confirmSwitch = () => configStore.proceedWithConfigSwitch?.(true)
</script>

<div class="container" title="Select whether you run a Core or Knots node">
	<Switch.Root bind:checked={optionsStore.useKnots} {id}>
		{#snippet child({ props })}
			<button {...props}>
				<Switch.Thumb>
					{#snippet child({ props, checked })}
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
			<label {...props}>
				<span>Knots</span>
				<span>{label}</span>
			</label>
		{/snippet}
	</Label.Root>

	<div class="version">v{version}</div>

	<Dialog
		open={confirmDialogOpen}
		title="Do you really want to switch your config?"
		description="This might remove some values that are unsupported by the target version."
		cancelText="Cancel"
		confirmText="Proceed"
		onCancel={abortSwitch}
		onConfirm={confirmSwitch}
	/>
</div>

<style lang="postcss">
	.container {
		display: flex;
		align-items: center;
		column-gap: 0.375rem;

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
	}

	label {
		position: relative;
		display: inline flex;
		font-weight: 500;
		cursor: pointer;

		> :first-child {
			/* here to keep text width stable when switching between "Core" and "Knots" */
			visibility: hidden;
		}
		> :last-child {
			position: absolute;
			inset: 0;
		}
	}

	.version {
		display: inline flex;
		align-items: center;
		color: var(--color-accent1);
	}
</style>
