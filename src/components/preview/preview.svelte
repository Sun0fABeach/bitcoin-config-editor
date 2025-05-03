<script lang="ts">
	import { onMount } from 'svelte'
	import { scale } from 'svelte/transition'
	import { building } from '$app/environment'
	import { getOnDesktopContext } from '@/context/onDesktop'
	import usePreviewStore from '@/stores/preview.svelte'
	import Panel from '@/components/preview/panel.svelte'

	const previewStore = usePreviewStore()

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

	const configText = $derived(previewStore.textContent)
</script>

{#if previewStore.showPreview || onDesktop.current || building}
	<aside class={{ 'visibility-guard': visibiltyGuard }} transition:scaleOnMobile>
		<Panel />
		<code>
			<textarea readonly value={configText}></textarea>
		</code>
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

		&.visibility-guard {
			display: none;
		}

		code {
			flex-grow: 1;
			display: flex;

			> textarea {
				flex-grow: 1;
				padding: 1rem;
				resize: none;
				border: 0;
				background-color: var(--color-background);
				color: var(--color-text-medium);
				font-size: 0.875em;

				&:focus {
					outline: none;
				}
			}
		}

		@media (min-width: 1024px) {
			position: relative;
			grid-area: preview;

			&.visibility-guard {
				display: flex;
			}

			> code {
				border-left: 1px dashed var(--color-layout-border);
			}
		}
	}
</style>
