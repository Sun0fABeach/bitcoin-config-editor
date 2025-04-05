<script lang="ts">
	import Button from '@/components/button.svelte'
	import { setOnDesktopContext } from '@/context/onDesktop'

	import favicon from '@/assets/favicon.png'
	import 'modern-normalize'
	import '@/global.css'
	import '@/layout.css'

	const { children } = $props()

	setOnDesktopContext()
</script>

<svelte:head>
	<title>Bitcoin Config Editor</title>
	<meta
		name="description"
		content="Create and edit configuration files for bitcoin full nodes. Supports both Core and Knots."
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:boundary>
	{@render children()}

	{#snippet failed(error, reset)}
		<div class="error-container">
			<h1>Bitcoin config editor just crashed</h1>
			<code>{error}</code>
			<div>
				<span>Sorry about that. Click here and you might recover:</span>
				<Button onclick={reset}>Go</Button>
			</div>
		</div>
	{/snippet}
</svelte:boundary>

<style lang="postcss">
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		row-gap: 1rem;
		padding: 0 2rem;

		> h1 {
			margin-bottom: 0;
		}

		> div > :first-child {
			margin-right: 0.5rem;
		}
	}
</style>
