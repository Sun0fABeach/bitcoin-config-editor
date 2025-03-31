<script lang="ts">
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/button.svelte'
	import NodeTypeSwitch from '@/components/node-type-switch.svelte'

	const { openPreview } = usePreviewStore()
</script>

<menu>
	<NodeTypeSwitch />
	<Button class="preview-button" onclick={openPreview}>Preview</Button>
	<Button class="options-button">Options</Button>
</menu>

<style lang="postcss">
	menu {
		grid-area: menu;
		display: flex;
		column-gap: 0.5rem;
		margin: 0;
		padding: 0.75rem;
		border: 1px solid var(--color-text-dark);
	}

	@media (min-width: 1024px) {
		menu :global(.preview-button) {
			display: none;
		}
	}
</style>
