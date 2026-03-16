<script lang="ts">
	import { tick } from 'svelte'
	import { browser } from '$app/environment'
	import { goto, afterNavigate, disableScrollHandling } from '$app/navigation'
	import { watch } from 'runed'
	import ScrollArea from '@/components/scroll-area.svelte'
	import CategorySelect from '@/components/editor/category-select.svelte'
	import ConfigList from '@/components/editor/config-list.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import useSearchStore from '@/stores/search.svelte'
	import type { CategoryDefinition } from '@/types/config-definition'

	const configStore = useConfigStore()
	// $inspect(configStore.values)
	const searchStore = useSearchStore()

	const findCategory = (title: CategoryDefinition['title']) =>
		configStore.categories.find((cat) => cat.title === title)

	const defaultCategory = () => findCategory('General')!

	let selectedCategoryTitle = $state<CategoryDefinition['title']>(defaultCategory().title)

	// we need to account for the selected category disappearing after version switch
	const selectedCategory = $derived(findCategory(selectedCategoryTitle) || defaultCategory())

	const getSelectedCategoryTitle = () => selectedCategory.title
	const setSelectedCategoryTitle = (title: CategoryDefinition['title']) => {
		selectedCategoryTitle = title
	}

	watch(
		() => configStore.categories,
		() => {
			if (!findCategory(selectedCategoryTitle)) {
				setSelectedCategoryTitle(defaultCategory().title)
			}
		},
	)

	const categorySelectItems = $derived(
		configStore.categories.map(({ title, description, knotsExclusive }) => ({
			value: title,
			label: title,
			description,
			knotsExclusive: !!knotsExclusive,
		})),
	)

	const categoryIsOpen = (title: CategoryDefinition['title']) =>
		getSelectedCategoryTitle() === title

	const scrollIntoView = (id: string) => {
		const scrollTarget = document.getElementById(id)
		if (scrollTarget) {
			scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	let doubleNavigation = false

	afterNavigate(async (navigation) => {
		if (doubleNavigation || navigation.type === 'enter') {
			// we do an extra manual goto after entry navigation (settings store), so ignore the entry
			doubleNavigation = false
			return
		}

		const hash = navigation.to?.url.hash
		if (!hash) {
			return
		}

		disableScrollHandling()

		const optionKey = hash.slice(1)
		if (!configStore.hasOption(optionKey)) {
			return
		}

		const categoryTitle = configStore.getCategoryTitle(optionKey)

		if (categoryIsOpen(categoryTitle)) {
			scrollIntoView(optionKey)
		} else {
			setSelectedCategoryTitle(categoryTitle)
			await tick()
			scrollIntoView(optionKey)
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

	const configFound = $derived(Object.keys(configStore.filteredConfigs ?? {}).length > 0)
</script>

<main>
	{#if !configStore.filteredConfigs}
		<CategorySelect
			bind:value={getSelectedCategoryTitle, setSelectedCategoryTitle}
			items={categorySelectItems}
		/>
	{/if}

	<ScrollArea>
		{#if browser}
			{#if configStore.filteredConfigs}
				{#if configFound}
					<ConfigList
						class="filtered-configs"
						configs={configStore.filteredConfigs}
						onclickcapture={onClick}
					/>
				{:else}
					<div class="no-match">
						No config option matches your search '{searchStore.normalizedSearch}'
					</div>
				{/if}
			{:else}
				<ConfigList configs={selectedCategory.configs} onclickcapture={onClick} />
			{/if}
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

		.no-match {
			display: flex;
			justify-content: center;
			text-align: center;
			padding: 1.5rem 0;
		}
	}
</style>
