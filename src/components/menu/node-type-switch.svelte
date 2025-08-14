<script lang="ts">
	import { Switch, Label } from 'bits-ui'
	import useSettingsStore from '@/stores/settings.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import KnotsLogo from '@/components/knots-logo.svelte'
	import Dialog from '@/components/dialog.svelte'

	const id = 'node-type-switch'

	const settingsStore = useSettingsStore()
	const configStore = useConfigStore()

	const getLabel = (isKnots?: boolean) => (isKnots ? 'Knots' : 'Core')

	const label = $derived(getLabel(settingsStore.useKnots))
	const version = $derived(settingsStore.currentVersion)
	const currentVersionFull = $derived(`${label} v${version}`)

	const switchIssues = $derived(configStore.configSwitchIssues)
	const confirmDialogOpen = $derived(!!switchIssues)

	const missingOptions = $derived(switchIssues?.missingOptions ?? [])
	const unsupportedValues = $derived(switchIssues?.unsupportedValues ?? [])
	const hasMissingOptions = $derived(missingOptions.length > 0)
	const hasUnsupportedValues = $derived(unsupportedValues.length > 0)
	const newVersionFull = $derived(
		`${getLabel(switchIssues?.newVersionIsKnots)} v${switchIssues?.newVersion}`,
	)

	const abortSwitch = () => switchIssues?.proceed(false)
	const confirmSwitch = () => switchIssues?.proceed(true)
</script>

<div class="container" title="Select whether you run a Core or Knots node">
	<Switch.Root bind:checked={settingsStore.useKnots} {id}>
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
		title={`Do you really want to switch from ${currentVersionFull} to ${newVersionFull}?`}
		cancelText="Cancel"
		confirmText="Proceed"
		onCancel={abortSwitch}
		onConfirm={confirmSwitch}
	>
		{#snippet description()}
			{#if hasMissingOptions}
				<div>
					Version incompatibilities detected. If you choose to proceed, the following values will be
					removed from your config.
				</div>
				<div>
					<div>Missing options in {newVersionFull}:</div>
					<ul>
						{#each missingOptions as missing (missing)}
							<li>{missing}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if hasUnsupportedValues}
				<div>
					<div>Unsupported values in {newVersionFull}:</div>
					<ul>
						{#each unsupportedValues as unsupported (unsupported)}
							<li>{unsupported}</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/snippet}
	</Dialog>
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

	ul {
		margin-top: 0.125rem;
		li {
			list-style: circle inside;
			white-space: nowrap;
			color: hsl(from var(--color-accent1) h s l / 0.75);
		}
	}
</style>
