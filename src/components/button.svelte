<script lang="ts">
	import { Button, type ButtonRootProps } from 'bits-ui'

	type ButtonProps = ButtonRootProps & {
		icon?: boolean
		noBorder?: boolean
	}

	const { icon, noBorder, class: passedClasses, ...attrs }: ButtonProps = $props()

	const classes = [
		passedClasses,
		'bce-button',
		{ 'bce-button--icon': icon },
		{ 'bce-button--no-border': noBorder },
	]
</script>

<Button.Root {...attrs} class={classes} />

<style lang="postcss">
	/* employing 'bce'-prefixed BEM-style classes here because all styles are global */
	:global {
		.bce-button {
			--border-color-dark: hsl(from green h s l / 0.5);
			--border-color-light: hsl(from green h s l / 0.8);

			display: inline-flex;
			justify-content: center;
			padding: 0.375rem 0.875rem;
			border: 1px solid var(--border-color-dark);
			border-top-color: var(--border-color-light);
			border-left-color: var(--border-color-light);
			border-radius: 0.25rem;
			background-color: var(--color-background);
			color: var(--color-text-light);
			cursor: pointer;
		}
		.bce-button:hover {
			background: var(--color-button-highlight-gradient);
		}
		.bce-button--no-border {
			border-color: var(--color-background);
		}
		.bce-button--no-border:hover {
			border-color: var(--border-color-dark);
		}
		.bce-button--icon {
			padding: 0.25rem 0.375rem;
		}
		.bce-button:active {
			transform: translate(1px, 1px);
			border-color: var(--border-color-dark);
			border-bottom-color: var(--border-color-light);
			border-right-color: var(--border-color-light);
		}
	}
</style>
