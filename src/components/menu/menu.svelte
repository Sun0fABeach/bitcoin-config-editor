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
	<Button class="generate-button" onclick={openPreview}>Generate Config</Button>
</menu>

<style lang="postcss">
	menu {
		grid-area: menu;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 0.75rem;
		row-gap: 0.75rem;
		margin: 0;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-layout-border);

		> :global(:not(:first-child)) {
			flex-grow: 1;
			@media (min-width: 650px) {
				flex-grow: 0;
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
