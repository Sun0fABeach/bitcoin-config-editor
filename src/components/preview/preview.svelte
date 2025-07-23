<script lang="ts">
	import { onMount } from 'svelte'
	import { scale } from 'svelte/transition'
	import { building } from '$app/environment'
	import { getOnDesktopContext } from '@/context/onDesktop'
	import usePreviewStore from '@/stores/preview.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import Panel from '@/components/preview/panel.svelte'
	import ScrollArea from '@/components/scroll-area.svelte'

	const placeholder = '# all configs on default settings'

	const previewStore = usePreviewStore()
	const configStore = useConfigStore()

	const onDesktop = getOnDesktopContext()

	const scaleOnMobile = (node: Element) =>
		onDesktop.current ? scale(node, { duration: 0 }) : scale(node)

	let prevOnDesktop = $state(onDesktop.current)
	$effect(() => {
		if (prevOnDesktop && !onDesktop.current) {
			previewStore.closePreview()
		}
		prevOnDesktop = onDesktop.current
	})

	/* we need to make sure the preview, although getting prerendered, is
	 * not visible on mobile before hydration is finished */
	let visibiltyGuard = $state(true)
	onMount(() => (visibiltyGuard = false))
</script>

{#if previewStore.showPreview || onDesktop.current || building}
	<aside class={{ 'visibility-guard': visibiltyGuard }} transition:scaleOnMobile>
		<Panel />
		<ScrollArea>
			<code>{configStore.text || placeholder}</code>
		</ScrollArea>
	</aside>
{/if}

<style lang="postcss">
	aside {
		/* consumed by ScrollArea component */
		--scroll-area-padding: 1rem calc(1rem + var(--scrollbar-width)) 1rem 1rem;

		display: flex;
		flex-flow: column;
		position: fixed;
		inset: 0;
		background-color: var(--color-background);

		&.visibility-guard {
			display: none;
		}

		@media (min-width: 1024px) {
			position: relative;
			grid-area: preview;

			&.visibility-guard {
				display: flex;
			}
		}

		code {
			display: block;
			color: var(--color-text-medium);
			font-size: 0.875em;
			white-space: pre-wrap;
		}
	}
</style>
