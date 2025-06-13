<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	export interface ConfigContainerBaseProps {
		title: string
		key: string
		description: string
		defaultValue?: string
	}

	type ConfigContainerProps = ConfigContainerBaseProps &
		HTMLAttributes<HTMLDivElement> & {
			children: Snippet
		}

	const {
		title,
		key,
		description,
		defaultValue,
		onclick,
		children,
		...attrs
	}: ConfigContainerProps = $props()
</script>

<div {...attrs} class="config-container" role="button" tabindex="-1" {onclick}>
	<div class="info">
		<div class="heading">
			<span>{title}</span>
			<span>{key}</span>
		</div>
		<div class="description">
			{description}
		</div>
		{#if defaultValue}
			<div class="default-value">
				<span>Default: </span>
				<span>{defaultValue}</span>
			</div>
		{/if}
	</div>

	{@render children()}
</div>

<style lang="postcss">
	.config-container {
		display: flex;
		flex-direction: column;
		row-gap: 0.75rem;
		padding: 0.5rem 0 0.5rem 1rem;
		cursor: pointer;

		@media (min-width: 420px) {
			padding: 0.5rem 1.125rem;
		}

		@media (800px <= width <= 1024px) or (min-width: calc(800px + 500px)) {
			flex-direction: row;
			align-items: flex-end;
			column-gap: 1.5rem;

			> .info {
				flex-grow: 1;
				align-self: flex-start;
			}
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		text-align: left;

		> .heading {
			display: flex;
			align-items: baseline;
			flex-wrap: wrap;
			column-gap: 0.75rem;
			row-gap: 0.125rem;

			> :last-child {
				font-size: 0.675em;
				color: var(--color-accent1);
			}
		}

		> .description {
			font-size: 0.875em;
			color: var(--color-text-medium);
		}

		> .default-value {
			font-size: 0.75em;
			> :first-child {
				color: var(--color-text-medium);
			}
			> :last-child {
				color: var(--color-accent1);
			}
		}
	}
</style>
