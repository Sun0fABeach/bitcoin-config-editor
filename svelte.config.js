import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		alias: {
			'@': 'src',
		},
		output: {
			bundleStrategy: 'inline',
		},
		inlineStyleThreshold: Infinity,
	},

	onwarn: (warning, handler) => {
		// console.log(warning.code); // <= uncomment to check other warnings

		if (
			warning.filename.endsWith('button.svelte') &&
			warning.code === 'vite-plugin-svelte-css-no-scopable-elements'
		)
			return

		handler(warning)
	},
}

export default config
