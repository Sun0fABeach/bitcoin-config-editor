<script lang="ts">
	import Header from '@/components/header.svelte'
	import Menu from '@/components/menu.svelte'
	import Editor from '@/components/editor.svelte'
	import Preview from '@/components/preview.svelte'

	import 'modern-normalize'
	import '@/global.css'
</script>

<Header />
<Menu />
<Editor />
<Preview />

<style>
	:global(#app) {
		height: 100vh;
		display: grid;
		grid-template-areas:
			'header'
			'menu'
			'editor';
		grid-template-columns: 1fr;
		grid-template-rows: auto auto 1fr;
		background-color: var(--color-background, 'black');
		color: var(--color-text-light, 'green');
	}

	@media (min-width: 1024px) {
		:global(#app) {
			grid-template-areas:
				'header header'
				'menu preview'
				'editor preview';
			grid-template-columns: 5fr minmax(450px, 3fr);
		}
	}
</style>
