<script lang="ts">
	import favicon from '@/assets/favicon.png'
	import 'modern-normalize'
	import '@/global.css'
	import '@/layout.css'

	const { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
