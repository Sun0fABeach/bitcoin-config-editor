<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { Button } from 'bits-ui'

	type ButtonProps = HTMLButtonAttributes & {
		icon?: boolean
		noBorder?: boolean
	}

	const { icon, noBorder, ...attrs }: ButtonProps = $props()

	const classes = [{ 'icon-button': icon }, { 'no-border': noBorder }]
</script>

<!-- need to wrap in a container for scoped targeting of bitsui button using CSS selectors-->
<span>
	<Button.Root class={classes} {...attrs} />
</span>

<style lang="postcss">
	span {
		display: contents;

		> :global([data-button-root]) {
			--border-color-dark: hsl(from green h s l / 0.5);
			--border-color-light: hsl(from green h s l / 0.8);

			display: inline-flex;
			padding: 0.375rem 0.875rem;
			border: 1px solid var(--border-color-dark);
			border-top-color: var(--border-color-light);
			border-left-color: var(--border-color-light);
			border-radius: 4px;
			background-color: var(--color-background);
			color: var(--color-text-light);
			cursor: pointer;
		}
		> :global([data-button-root].no-border) {
			border: 0;
		}
		> :global([data-button-root].icon-button) {
			padding: 0.25rem 0.375rem;
		}
		> :global([data-button-root]:active) {
			transform: translate(1px, 1px);
			border-color: var(--border-color-dark);
			border-bottom-color: var(--border-color-light);
			border-right-color: var(--border-color-light);
		}
	}
</style>
