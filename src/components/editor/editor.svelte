<script lang="ts">
	import { Accordion } from 'bits-ui'
	import ScrollArea from '@/components/scroll-area.svelte'
	import Category, { type CategoryProps } from '@/components/editor/category.svelte'

	const categories: CategoryProps[] = [
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

	let openCategories = $state<CategoryProps['title'][]>([])
</script>

<main>
	<ScrollArea>
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
	</ScrollArea>
</main>

<style lang="postcss">
	main {
		/* consumed by ScrollArea component */
		--scroll-area-padding: 0 calc(1rem + var(--scrollbar-width)) 1.25rem 1rem;

		grid-area: editor;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;

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
