import generateConfigKnotsV29_1 from '@/configs/knots/29.1'
import { patchCategoryOptions } from '@/configs/helpers'

export default function () {
	const categories = generateConfigKnotsV29_1()

	patchCategoryOptions(categories, 'General', (options) => ({
		...options,

		lowmem: {
			...options.lowmem,
			defaultValue: '0',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		datacarriersize: {
			...options.datacarriersize,
			defaultValue: '83',
		},
	}))

	return categories
}
