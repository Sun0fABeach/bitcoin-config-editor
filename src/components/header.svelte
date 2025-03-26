<script lang="ts">
	import { CurrencyBtc, GithubLogo } from 'phosphor-svelte'
	import { repoUrl } from '@/globals'
</script>

<header>
	<CurrencyBtc size={32} weight="light" />
	<a href={repoUrl} target="_blank" title="visit git repository">
		<GithubLogo size={32} weight="duotone" />
	</a>
</header>

<style lang="postcss">
	header {
		grid-area: header;
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-text-dark);
	}
</style>
