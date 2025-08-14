import type { CategoryDefinition } from '@/types/config-definition'

export function getCategoryIndex(categories: CategoryDefinition[], categoryTitle: string) {
	return categories.findIndex(({ title }) => title === categoryTitle)
}

export function patchCategoryOptions(
	categories: CategoryDefinition[],
	categoryTitle: string,
	modifierCallback: (options: CategoryDefinition['configs']) => CategoryDefinition['configs'],
) {
	const categoryIndex = getCategoryIndex(categories, categoryTitle)
	const category = categories[categoryIndex]
	const modifiedOptions = modifierCallback(category.configs)

	categories[categoryIndex] = {
		...category,

		configs: Object.entries(modifiedOptions)
			.sort(([key1], [key2]) => key1.localeCompare(key2))
			.reduce(
				(result, [key, value]) => {
					result[key] = value
					return result
				},
				{} as CategoryDefinition['configs'],
			),
	}
}
