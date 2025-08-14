<script lang="ts">
	import { ScrollArea, type ScrollAreaRootProps } from 'bits-ui'

	const { type = 'always', children }: ScrollAreaRootProps = $props()
</script>

<ScrollArea.Root {type}>
	{#snippet child({ props })}
		<div {...props} class="scroll-area-root">
			<ScrollArea.Viewport>
				{@render children?.()}
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar orientation="vertical">
				{#snippet child({ props })}
					<div {...props} class="scrollbar">
						<ScrollArea.Thumb>
							{#snippet child({ props })}
								<div {...props} class="scrollbar-thumb"></div>
							{/snippet}
						</ScrollArea.Thumb>
					</div>
				{/snippet}
			</ScrollArea.Scrollbar>
		</div>
	{/snippet}
</ScrollArea.Root>

<style lang="postcss">
	.scroll-area-root {
		display: flex;
		flex-flow: column;
		height: 100%;
		padding: var(--scroll-area-padding); /* to be defined by parent component */
		overflow-y: hidden;

		> .scrollbar {
			background-color: var(--scrollbar-color);
			width: var(--scrollbar-width);
			padding: 0 0.125rem;

			> .scrollbar-thumb {
				background-color: var(--scrollbar-thumb-color);
				border-radius: 9999px;
			}
		}
	}
</style>
