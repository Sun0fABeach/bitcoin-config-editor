<script lang="ts">
	import { setContext } from 'svelte'
	import { MediaQuery } from 'svelte/reactivity'
	import { breakpoint } from '@/globals'

	import favicon from '@/assets/favicon.png'
	import 'modern-normalize'
	import '@/global.css'
	import '@/layout.css'

	const { children } = $props()

	const onDesktop = new MediaQuery(`min-width: ${breakpoint}px`)
	setContext('onDesktop', onDesktop)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
