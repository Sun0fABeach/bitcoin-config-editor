<script lang="ts">
	import type { WithChildren } from 'bits-ui'
	import Dialog from './dialog.svelte'
	import { type ConfigValueIssues } from '@/stores/config.svelte'

	type CompatibilityDialogProps = WithChildren & {
		title: string
		issues: ConfigValueIssues | null
	}

	const { title, issues, children }: CompatibilityDialogProps = $props()

	const dialogOpen = $derived(!!issues)
	const missingOptions = $derived(issues?.missingOptions ?? [])
	const unsupportedValues = $derived(issues?.unsupportedValues ?? [])
	const targetVersion = $derived(
		`${issues?.targetVersionIsKnots ? 'Knots' : 'Core'} v${issues?.targetVersion}`,
	)
	const hasMissingOptions = $derived(missingOptions.length > 0)
	const hasUnsupportedValues = $derived(unsupportedValues.length > 0)

	const onCancel = () => {
		issues!.proceed(false)
	}
	const onConfirm = () => {
		issues!.proceed(true)
	}
</script>

<Dialog open={dialogOpen} {title} cancelText="Cancel" confirmText="Proceed" {onCancel} {onConfirm}>
	{#snippet description()}
		{#if hasMissingOptions}
			<div>{@render children!()}</div>
			<div>
				<div>Missing options in {targetVersion}:</div>
				<ul>
					{#each missingOptions as missing (missing)}
						<li>{missing}</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if hasUnsupportedValues}
			<div>
				<div>Unsupported values in {targetVersion}:</div>
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
