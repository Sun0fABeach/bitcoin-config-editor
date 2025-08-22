<script lang="ts">
	import { onMount } from 'svelte'
	import usePreviewStore from '@/stores/preview.svelte'
	import NodeTypeSwitch from '@/components/menu/node-type-switch.svelte'
	import Search from '@/components/menu/search.svelte'
	import Button from '@/components/button.svelte'
	import Options from '@/components/menu/settings.svelte'

	const { openPreview } = usePreviewStore()

	/* we need to make sure the version switch, although getting prerendered, is
	 * not visible before hydration is finished and we know the active version */
	let visibiltyGuard = $state(true)
	onMount(() => setTimeout(() => (visibiltyGuard = false), 150))
</script>

<menu>
	<div class={{ 'visibility-guard': visibiltyGuard }}>
		<NodeTypeSwitch />
	</div>
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
			@media (min-width: 700px) {
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

		> div {
			transition: opacity 0.5s;
			&.visibility-guard {
				opacity: 0;
			}
		}
	}
</style>
