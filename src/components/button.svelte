<script lang="ts">
	const { children, ...attrs } = $props()
</script>

<button {...attrs}>
	{@render children()}
</button>

<style lang="postcss">
	button {
		--border-color-dark: hsl(from green h s l / 0.5);
		--border-color-light: hsl(from green h s l / 0.8);

		padding: 0.375rem 0.875rem;
		border: 1px solid var(--border-color-dark);
		border-top-color: var(--border-color-light);
		border-left-color: var(--border-color-light);
		border-radius: 4px;
		background-color: var(--color-background);
		color: var(--color-text-light);
		cursor: pointer;

		&:active {
			transform: translate(1px, 1px);
			border-color: var(--border-color-dark);
			border-bottom-color: var(--border-color-light);
			border-right-color: var(--border-color-light);
		}
	}
</style>
