<script lang="ts">
	import favicon from '@/assets/favicon.png'

	const { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
