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
	<Options />
	<Button class="generate-button" onclick={openPreview}>Generate Config</Button>
	<Search />
</menu>

<style lang="postcss">
	menu {
		grid-area: menu;
		display: flex;
		flex-flow: wrap;
		align-items: center;
		column-gap: 0.75rem;
		row-gap: 0.75rem;
		margin: 0;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-layout-border);

		> :global(:not(:first-child)) {
			flex: 1 auto;
			@media (min-width: 650px) {
				flex: none;
			}
		}

		@media (min-width: 1024px) {
			height: var(--menu-height-desktop);
			padding-top: 0;
			padding-bottom: 0;
			align-items: center;

			> :global(.generate-button) {
				display: none;
			}
		}
	}
</style>
