<script lang="ts">
	import { Accordion } from 'bits-ui'
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

<main>
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
</main>

<style lang="postcss">
	main {
		grid-area: editor;
		padding: 0 1rem 1.25rem 1rem;
		overflow-y: auto;

		> ul {
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
