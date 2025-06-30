<script lang="ts">
	import { Accordion } from 'bits-ui'
	import ScrollArea from '@/components/scroll-area.svelte'
	import Category, { type CategoryProps } from '@/components/editor/category.svelte'
	import useConfigStore from '@/stores/config.svelte'

	const configStore = useConfigStore()

	let openCategories = $state<CategoryProps['title'][]>([])

	const categoryIsOpen = (title: CategoryProps['title']) => openCategories.includes(title)

	const openCategory = (title: CategoryProps['title']) => {
		if (!categoryIsOpen(title)) {
			openCategories.push(title)
		}
	}

	const scrollIntoView = (id: string) => {
		const scrollTarget = document.getElementById(id)
		if (scrollTarget) {
			scrollTarget.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const onClick = async (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const href = target.getAttribute('href')

		if (href) {
			event.stopPropagation()
			event.preventDefault()

			const elementId = href.slice(1)
			const categoryTitle = configStore.configIndex[elementId].category

			if (categoryIsOpen(categoryTitle)) {
				scrollIntoView(elementId)
			} else {
				openCategory(categoryTitle)
				onCategoryOpenFinished = () => {
					scrollIntoView(elementId)
					onCategoryOpenFinished = () => {}
				}
			}
		}
	}

	let onCategoryOpenFinished = $state(() => {}) // modified by onClick
</script>

<main>
	<ScrollArea>
		<Accordion.Root type="multiple" bind:value={openCategories} onclickcapture={onClick}>
			{#snippet child({ props })}
				<ul {...props}>
					{#each configStore.categories as category (category.title)}
						<li>
							<Category
								{...category}
								bind:values={configStore.values}
								onOpenFinished={onCategoryOpenFinished}
							/>
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
		flex-flow: column;
		overflow-y: hidden;

		ul {
			display: flex;
			flex-flow: column;

			> li:not(:last-child)::after {
				content: '';
				display: block;
				width: 100%;
				border-bottom: 1px dotted var(--color-layout-border);
			}
		}
	}
</style>
