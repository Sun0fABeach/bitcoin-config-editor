<script lang="ts">
	import { ScrollArea, Accordion } from 'bits-ui'
	import Category from '@/components/editor/category.svelte'

	interface Category {
		title: string
		description: string
	}

	const categories: Category[] = [
		{
			title: 'General',
			description: 'Basic parameters regarding node operation',
		},
		{
			title: 'Chain Selection',
			description: 'Which network / blockchain to use',
		},
		{
			title: 'Networking',
			description: 'How your node interacts with other peers on the network',
		},
		{
			title: 'Mempool',
			description: 'What transactions your node will relay to peers',
		},
		{
			title: 'Mining',
			description: 'Attributes of blocks that can be mined by your node',
		},
		{
			title: 'RPC',
			description: "Security and performance options for accessing your node's RPC interface",
		},
		{
			title: 'Wallet',
			description: "Behavior of your node's wallet",
		},
		{
			title: 'ZeroMQ',
			description: 'Options for handling notifications emitted via ZeroMQ',
		},
		{
			title: 'Statistics',
			description: 'Options for collecting statistics',
		},
		{
			title: 'Debugging & Testing',
			description: 'Features that help developers',
		},
	]

	let openCategories = $state<Category['title'][]>([])
</script>

<ScrollArea.Root type="always">
	{#snippet child({ props })}
		<main {...props}>
			<ScrollArea.Viewport>
				<Accordion.Root type="multiple" bind:value={openCategories}>
					{#snippet child({ props })}
						<ul {...props}>
							{#each categories as category (category.title)}
								<li>
									<Category {...category} />
								</li>
							{/each}
						</ul>
					{/snippet}
				</Accordion.Root>
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar orientation="vertical">
				{#snippet child({ props })}
					<div {...props} class="scrollbar">
						<ScrollArea.Thumb>
							{#snippet child({ props })}
								<div {...props} class="thumb"></div>
							{/snippet}
						</ScrollArea.Thumb>
					</div>
				{/snippet}
			</ScrollArea.Scrollbar>
		</main>
	{/snippet}
</ScrollArea.Root>

<style lang="postcss">
	main {
		--scrollbar-width: 0.75rem;
		--scrollbar-color: hsl(from green h s l / 0.2);
		--scrollbar-thumb-color: hsl(from green h s l / 0.45);

		grid-area: editor;
		display: flex;
		width: 100%;
		padding: 0 calc(1rem + var(--scrollbar-width)) 1.25rem 1rem;
		overflow-y: hidden;

		> :global([data-scroll-area-viewport]) {
			flex-grow: 1;
		}

		> .scrollbar {
			background-color: var(--scrollbar-color);
			width: var(--scrollbar-width);
			padding: 0 0.125rem;

			> .thumb {
				background-color: var(--scrollbar-thumb-color);
				border-radius: 9999px;
			}
		}

		ul {
			display: flex;
			flex-direction: column;

			> li:not(:last-child)::after {
				content: '';
				display: block;
				width: 100%;
				border-bottom: 1px dotted var(--color-layout-border);
			}
		}
	}
</style>
