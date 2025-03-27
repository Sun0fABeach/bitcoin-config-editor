<script lang="ts">
	import { getContext } from 'svelte'
	import type { MediaQuery } from 'svelte/reactivity'
	import { scale } from 'svelte/transition'
	import { building } from '$app/environment'
	import usePreviewStore from '@/stores/preview.svelte'
	import Toolbar from '@/components/preview-menu/toolbar.svelte'

	const previewStore = usePreviewStore()

	const onDesktop: MediaQuery = getContext('onDesktop')

	const scaleOnMobile = (node: Element) =>
		onDesktop.current ? scale(node, { duration: 0 }) : scale(node)

	let prevOnDesktop = $state(onDesktop.current)
	$effect(() => {
		if (prevOnDesktop && !onDesktop.current) {
			previewStore.closePreview()
		}
		prevOnDesktop = onDesktop.current
	})

	const configText = $derived(previewStore.textContent)
</script>

{#if previewStore.showPreview || onDesktop.current || building}
	<aside transition:scaleOnMobile>
		<Toolbar />
		<textarea readonly value={configText}></textarea>
	</aside>
{/if}

<style lang="postcss">
	aside {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-background);
	}

	@media (min-width: 1024px) {
		aside {
			position: relative;
			grid-area: preview;
			border: 1px solid var(--color-text-dark);
		}
	}

	textarea {
		flex-grow: 1;
		width: 100%;
		padding: 1rem;
		resize: none;
		border: none;
		background-color: var(--color-background);
		color: var(--color-text-medium);

		&:focus {
			outline: none;
		}
	}
</style>
