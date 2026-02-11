import generateConfigKnotsV29_2 from '@/configs/knots/29.2'
import { patchCategoryOptions } from '@/configs/helpers'

export default function () {
	const categories = generateConfigKnotsV29_2()

	patchCategoryOptions(categories, 'General', (options) => ({
		...options,

		softwareexpiry: {
			...options.softwareexpiry,
			defaultValue: '1857151480',
		},
	}))

	return categories
}
