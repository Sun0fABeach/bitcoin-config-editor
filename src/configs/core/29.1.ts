import generateConfigCore29_0 from '@/configs/core/29.0'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigCore29_0()

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		incrementalrelayfee: {
			...options.incrementalrelayfee,
			defaultValue: '0.000001',
		},

		minrelaytxfee: {
			...options.minrelaytxfee,
			defaultValue: '0.000001',
		},
	}))

	patchCategoryOptions(categories, 'Mining', (options) => ({
		...options,

		blockmintxfee: {
			...options.blockmintxfee,
			defaultValue: '0.00000001',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => ({
		...options,

		logratelimit: {
			type: EditorValueType.CHECKBOX,
			title: 'Log Rate Limit',
			description: 'Apply rate limiting to unconditional logging to mitigate disk-filling attacks',
			defaultValue: '1',
		},
	}))

	return categories
}
