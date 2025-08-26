<script lang="ts">
	import Dialog from './dialog.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import useSettingsStore from '@/stores/settings.svelte'

	const configStore = useConfigStore()
	const settingsStore = useSettingsStore()

	const getLabel = (isKnots?: boolean) => (isKnots ? 'Knots' : 'Core')

	const label = $derived(getLabel(settingsStore.useKnots))
	const version = $derived(settingsStore.currentVersion)
	const currentVersionFull = $derived(`${label} v${version}`)

	const configSwitchIssues = $derived(configStore.configSwitchIssues)
	const replaceValuesIssues = $derived(configStore.replaceValuesIssues)
	const issues = $derived(configSwitchIssues || replaceValuesIssues)
	const dialogOpen = $derived(!!issues)
	const missingOptions = $derived(issues?.missingOptions ?? [])
	const unsupportedValues = $derived(issues?.unsupportedValues ?? [])
	const hasMissingOptions = $derived(missingOptions.length > 0)
	const hasUnsupportedValues = $derived(unsupportedValues.length > 0)
	const targetVersionFull = $derived(
		`${getLabel(issues?.targetVersionIsKnots)} v${issues?.targetVersion}`,
	)

	const title = $derived(
		configSwitchIssues
			? `Do you really want to switch from ${currentVersionFull} to ${targetVersionFull}?`
			: 'Do you really want to apply this config?',
	)

	const onCancel = () => {
		issues!.proceed(false)
	}
	const onConfirm = () => {
		issues!.proceed(true)
	}
</script>

<Dialog
	open={dialogOpen}
	padScrollArea
	{title}
	cancelText="Cancel"
	confirmText="Proceed"
	{onCancel}
	{onConfirm}
>
	{#snippet description()}
		<div>
			{#if configSwitchIssues}
				Version incompatibilities detected. If you choose to proceed, the following values will be
				removed from your config.
			{:else}
				The config file you selected has compatibility issues. If you choose to proceed, the
				following values will be removed from the config.
			{/if}
		</div>
		{#if hasMissingOptions}
			<div>
				<div>Missing options in {targetVersionFull}:</div>
				<ul>
					{#each missingOptions as missing (missing)}
						<li>{missing}</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if hasUnsupportedValues}
			<div>
				<div>Unsupported values in {targetVersionFull}:</div>
				<ul>
					{#each unsupportedValues as unsupported (unsupported)}
						<li>{unsupported}</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/snippet}
</Dialog>

<style lang="postcss">
	ul {
		margin-top: 0.25rem;
		padding-left: 0.25rem;

		li {
			list-style: circle inside;
			overflow-x: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: var(--color-accent1-light);
		}
	}
</style>
