<script lang="ts">
	import usePreviewStore from '@/stores/preview.svelte'

	const { openPreview } = usePreviewStore()
</script>

<menu>
	<button class="preview-button" onclick={openPreview}>preview</button>
</menu>

<style>
	menu {
		grid-area: menu;
		margin: 0;
		padding: 0.5rem;
		border: 1px solid var(--color-text-dark, 'green');
	}

	button {
		padding: 0.25rem 0.625rem;
		border: 2px solid var(--color-text-dark, 'green');
		border-radius: 5px;
		background-color: var(--color-background, 'black');
		color: 1px solid var(--color-text-light, 'green');
	}

	@media (min-width: 1024px) {
		.preview-button {
			display: none;
		}
	}
</style>
