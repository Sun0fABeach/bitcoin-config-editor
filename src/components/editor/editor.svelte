<script lang="ts">
	import { goto, afterNavigate, disableScrollHandling } from '$app/navigation'
	import { Accordion } from 'bits-ui'
	import ScrollArea from '@/components/scroll-area.svelte'
	import Category, { type CategoryProps } from '@/components/editor/category.svelte'
	import ConfigList from '@/components/editor/config-list.svelte'
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
			scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	let doubleNavigation = false

	afterNavigate((navigation) => {
		if (doubleNavigation) {
			doubleNavigation = false
			return
		}

		const hash = navigation.to?.url.hash
		if (!hash) {
			return
		}

		disableScrollHandling()

		const elementId = hash.slice(1)
		const categoryTitle = configStore.getCategoryTitle(elementId)

		if (categoryIsOpen(categoryTitle)) {
			scrollIntoView(elementId)
		} else {
			openCategory(categoryTitle)
			onCategoryOpenFinished = () => {
				scrollIntoView(elementId)
				onCategoryOpenFinished = () => {}
			}
		}
	})

	const onClick = async (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const href = target.getAttribute('href')

		if (href) {
			event.stopPropagation()
			event.preventDefault()

			const clickedConfigId = target.closest('.config-list-item')!.id
			const gotoConfigId = href.slice(1)

			doubleNavigation = true
			// remember where we navigated from to enable return via browser-back
			// keepFocus flag also required to prevent native scroll
			await goto(`#${clickedConfigId}`, { noScroll: true, keepFocus: true })
			goto(`#${gotoConfigId}`, { noScroll: true, keepFocus: true })
		}
	}

	let onCategoryOpenFinished = $state(() => {}) // modified by onClick

	const configFound = $derived(Object.keys(configStore.filteredConfigs ?? {}).length > 0)
</script>

<main>
	<ScrollArea>
		{#if configStore.filteredConfigs}
			{#if configFound}
				<ConfigList
					class="filtered-configs"
					configs={configStore.filteredConfigs}
					bind:values={configStore.values}
					onclickcapture={onClick}
				/>
			{:else}
				<div class="no-match">No config matches your search</div>
			{/if}
		{:else}
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
		{/if}
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

		:global .filtered-configs {
			padding: 1.5rem 0;
		}

		.no-match {
			display: flex;
			justify-content: center;
			text-align: center;
			padding: 1.5rem 0;
		}

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
