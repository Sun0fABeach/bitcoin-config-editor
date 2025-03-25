<script lang="ts">
	import { getContext } from 'svelte'
	import type { MediaQuery } from 'svelte/reactivity'
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/button.svelte'

	const onDesktop: MediaQuery = getContext('onDesktop')

	const { openPreview } = usePreviewStore()
</script>

<menu>
	{#if !onDesktop.current}
		<Button onclick={openPreview}>Preview</Button>
	{/if}
</menu>

<style lang="postcss">
	menu {
		grid-area: menu;
		margin: 0;
		padding: 0.5rem;
		border: 1px solid var(--color-text-dark);
	}
</style>
