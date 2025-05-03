<script lang="ts">
	import { CurrencyBtc, GithubLogo } from 'phosphor-svelte'
	import { repoUrl } from '@/globals'
</script>

<header>
	<h1>
		<CurrencyBtc size={32} weight="light" /><span>itcoin Config Editor</span>
	</h1>
	<a href={repoUrl} target="_blank" title="visit git repository">
		<GithubLogo size={32} weight="duotone" />
	</a>
</header>

<style lang="postcss">
	header {
		grid-area: header;
		display: flex;
		align-items: center;
		padding: 0.5rem;
		border-bottom: 2px solid var(--color-layout-border);

		> :first-child {
			display: inline-flex;
			align-items: flex-end;
			margin-right: auto;

			@media (min-width: 420px) {
				margin-left: auto;
			}

			> :last-child {
				margin-left: -5px;
				margin-bottom: 2px;
				font-size: 1.25em;
			}
		}
	}
</style>
