<script lang="ts">
	import { CurrencyBtc, GithubLogo } from 'phosphor-svelte'
	import { repoUrl } from '@/globals'
</script>

<header>
	<h1>
		<CurrencyBtc size={32} weight="light" /><span>itcoin&nbsp;</span><span>Config Editor</span>
	</h1>
	<a href={repoUrl} target="_blank" title="Visit git repository">
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

		> h1 {
			flex: 1;
			display: inline flex;
			align-items: end;
			font-size: 1.25em;

			> :nth-child(2) {
				display: none;
			}
			> :last-child {
				margin: 0 auto;
			}

			@media (min-width: 500px) {
				justify-content: center;

				> :nth-child(2) {
					display: initial;
					margin-left: -5px;
				}
				> :last-child {
					margin: 0;
				}
			}
		}
	}
</style>
