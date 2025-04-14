<script lang="ts">
	import usePreviewStore from '@/stores/preview.svelte'
	import NodeTypeSwitch from '@/components/menu/node-type-switch.svelte'
	import Search from '@/components/menu/search.svelte'
	import Button from '@/components/button.svelte'
	import Options from '@/components/menu/options.svelte'

	const { openPreview } = usePreviewStore()
</script>

<menu>
	<NodeTypeSwitch />
	<Search />
	<Options />
	<Button class="preview-button" onclick={openPreview}>Preview</Button>
</menu>

<style lang="postcss">
	menu {
		grid-area: menu;
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.75rem;
		row-gap: 0.75rem;
		margin: 0;
		padding: 0.75rem;
		border: 1px solid var(--color-text-dark);

		> :global(*) {
			flex-grow: 1;
			@media (min-width: 550px) {
				flex-grow: 0;
			}
		}

		@media (min-width: 1024px) {
			> :global(.preview-button) {
				display: none;
			}
		}
	}
</style>
