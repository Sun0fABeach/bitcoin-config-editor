<script lang="ts">
	import { type Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { Link } from 'phosphor-svelte'
	import ConfirmPopover, {
		openDuration as copyPopoverDuration,
	} from '@/components/confirm-popover.svelte'
	import KnotsLogo from '@/components/knots-logo.svelte'
	import useTimeoutFlag from '@/hooks/useTimeoutFlag.svelte'
	import useSettingsStore from '@/stores/settings.svelte'
	import { deeplinkOptionUrl } from '@/lib/url'
	import { colors } from '@/globals'
	import type { ConfigOption, ConfigDefinition } from '@/types/config-definition'
	import type { EditorValueAny } from '@/types/editor'

	export interface ConfigContainerBaseProps {
		knotsExclusive?: ConfigDefinition['knotsExclusive']
		key: string
		title: ConfigDefinition['title']
		description: ConfigDefinition['description']
		options?: ConfigOption['value'][]
		defaultValue?: ConfigDefinition['defaultValue']
	}

	type ConfigContainerProps = ConfigContainerBaseProps &
		HTMLAttributes<HTMLDivElement> & {
			value: EditorValueAny
			children: Snippet
		}

	const {
		knotsExclusive,
		key,
		title,
		description,
		options,
		defaultValue,
		value,
		children,
		...attrs
	}: ConfigContainerProps = $props()

	const settingsStore = useSettingsStore()

	const showKnotsExclusivity = $derived(knotsExclusive && settingsStore.highlightKnotsExclusives)

	const multipleDefaults = defaultValue && typeof defaultValue === 'object'
	const displayedValue = $derived.by(() => {
		if (Array.isArray(value)) {
			return value.join(', ')
		} else {
			switch (value) {
				case true:
					return '1'
				case false:
					return '0'
				default:
					return value
			}
		}
	})

	const linkHighlight = useTimeoutFlag(copyPopoverDuration + 300)

	const copyConfigUrl = () => {
		navigator.clipboard.writeText(
			deeplinkOptionUrl(settingsStore.useKnots, settingsStore.currentVersion, key),
		)
		linkHighlight.callback(true)
	}
</script>

<div {...attrs} class="config-container" tabindex="-1">
	<div class="heading">
		<div class="title">
			<span>{title}</span>
			<span>{key}</span>
		</div>
		{#if showKnotsExclusivity}
			<KnotsLogo alt="Knots exclusive" title="Knots exclusive" />
		{/if}
		<ConfirmPopover text="Link copied" onClick={copyConfigUrl}>
			{#snippet trigger({ props })}
				<button {...props} class={{ highlight: linkHighlight.flag }}>
					<Link size={16} color={colors.accent2} />
				</button>
			{/snippet}
		</ConfirmPopover>
	</div>
	<div class="content">
		<div class="info">
			{#if settingsStore.showDescriptions}
				<div class="description">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html description}
				</div>
			{/if}
			<div class="settings">
				{#if options}
					<div class="options">
						<span>Options: </span>
						<span>{options?.join(', ')}</span>
					</div>
				{/if}
				{#if defaultValue}
					<div class="default-value">
						{#if multipleDefaults}
							<div>Defaults</div>
							<ul>
								{#each Object.entries(defaultValue) as [key, value] (key)}
									<li><span>{key}:&nbsp;</span><span>{value}</span></li>
								{/each}
							</ul>
						{:else}
							<span>Default: </span>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<span>{@html defaultValue}</span>
						{/if}
					</div>
				{/if}
				<div class="value">
					<span>User value: </span>
					<span>{displayedValue}</span>
				</div>
			</div>
		</div>

		{@render children()}
	</div>
</div>

<style lang="postcss">
	.config-container {
		display: flex;
		flex-flow: column;
		row-gap: 0.5rem;
		padding: 0.5rem 0 0.5rem 1rem;

		@media (min-width: 420px) {
			padding: 0.5rem 1.125rem;
		}

		@media (pointer: fine) {
			&:hover > .heading > button:not(.highlight) {
				opacity: 0.5;
			}
		}
	}

	.heading {
		display: flex;
		column-gap: 0.75rem;

		@media (pointer: fine) {
			column-gap: 0.625rem;
		}

		> .title {
			display: flex;
			flex-flow: wrap;
			align-items: baseline;
			column-gap: 0.75rem;
			row-gap: 0.125rem;

			> :last-child {
				font-size: 0.675em;
				color: var(--color-accent1);
			}
		}

		:global > img {
			height: 1.25rem;
		}

		button {
			display: inline flex;
			align-self: start;
			margin-left: auto;
			padding-top: 0.125rem;
			opacity: 0.75;
			transition: opacity 150ms;
			&[data-state='open'] {
				opacity: 1;
			}

			@media (pointer: fine) {
				margin-left: 0;
				opacity: 0;
				&.highlight {
					opacity: 1;
				}
			}
		}
	}

	.content {
		display: flex;
		flex-flow: column;
		row-gap: 0.75rem;

		@media (800px <= width <= 1024px) or (min-width: calc(800px + 500px)) {
			flex-flow: row;
			align-items: end;
			column-gap: 1.5rem;

			> .info {
				flex: 1;
				align-self: start;
			}
		}
	}

	.info {
		display: flex;
		flex-flow: column;
		row-gap: 0.5rem;
		text-align: left;

		> .description {
			font-size: 0.875em;
			color: var(--color-text-medium);
		}

		> .settings {
			display: flex;
			flex-flow: column;
			row-gap: 0.25rem;

			> .options,
			> .default-value,
			> .value {
				font-size: 0.75em;
				> :first-child {
					color: var(--color-accent2);
				}
				> :last-child {
					color: var(--color-accent1);
				}
			}

			> .default-value li {
				display: flex;
				flex-flow: wrap;
				> :first-child {
					color: var(--color-accent2);
				}
				> :last-child {
					overflow-x: hidden;
					text-overflow: ellipsis;
				}
			}

			> .value {
				overflow-wrap: anywhere;
			}
		}
	}
</style>
