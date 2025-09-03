<script lang="ts">
	import { onMount } from 'svelte'
	import { building } from '$app/environment'
	import { Notepad } from 'phosphor-svelte'
	import usePreviewStore from '@/stores/preview.svelte'
	import NodeTypeSwitch from '@/components/menu/node-type-switch.svelte'
	import Search from '@/components/menu/search.svelte'
	import Button from '@/components/buttons/button.svelte'
	import SettingsButton from '@/components/buttons/settings-button.svelte'
	import SearchButton from '@/components/buttons/search-button.svelte'
	import DownloadButton from '@/components/buttons/download-button.svelte'
	import UploadButton from '@/components/buttons/upload-button.svelte'
	import ClearButton from '@/components/buttons/clear-button.svelte'
	import SearchDialog from '@/components/dialogs/search-dialog.svelte'
	import CompatibilityDialog from '@/components/dialogs/compatibility-dialog.svelte'

	const { openPreview } = usePreviewStore()

	let searchDialogOpen = $state(false)

	/* we need to make sure the version switch, although getting prerendered, is
	 * not visible before hydration is finished and we know the active version */
	let visibilityGuard = $state(true)
	onMount(() => setTimeout(() => (visibilityGuard = false), 150))
</script>

<menu>
	<li class={['node-type-switch', { 'visibility-guard': !building && visibilityGuard }]}>
		<NodeTypeSwitch />
	</li>
	<li class="settings-button">
		<SettingsButton />
	</li>
	<li class="show-config-button">
		<Button onclick={openPreview}>Show Config</Button>
	</li>
	<li class="search-button">
		<Search />
	</li>
	<li class="icon-buttons">
		<div class="show-config-icon-button icon-button-wrapper">
			<Button icon title="Show config" onclick={openPreview}>
				<Notepad size={22} weight="regular" />
			</Button>
		</div>
		<div class="search-icon-button icon-button-wrapper">
			<SearchButton onclick={() => (searchDialogOpen = true)} />
		</div>
		<div class="settings-icon-button icon-button-wrapper">
			<SettingsButton icon />
		</div>
		<DownloadButton />
		<UploadButton />
		<ClearButton />
	</li>
</menu>

<SearchDialog bind:open={searchDialogOpen} />
<CompatibilityDialog />

<style lang="postcss">
	menu {
		grid-area: menu;
		display: flex;
		flex-flow: wrap;
		align-items: center;
		column-gap: 0.75rem;
		row-gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-layout-border);

		@media (min-width: 1024px) {
			height: var(--menu-height-desktop);
		}

		> li {
			display: flex;

			&.node-type-switch {
				transition: opacity 0.5s;
				&.visibility-guard {
					opacity: 0;
				}
			}

			&:not(.node-type-switch) {
				flex: 1 auto;
				@media (min-width: 900px) {
					flex: none;
				}
			}

			&.icon-buttons {
				display: flex;
				column-gap: 0.25rem;
				margin-left: auto;
			}

			:global > *,
			> .icon-button-wrapper :global > * {
				flex: 1;
			}

			&.settings-button,
			&.show-config-button,
			&.search-button {
				display: none;
			}
			> .settings-icon-button,
			> .show-config-icon-button,
			> .search-icon-button {
				display: contents;
			}

			@media (min-width: 590px) {
				&.show-config-button {
					display: flex;
				}
				> .show-config-icon-button {
					display: none;
				}
			}
			@media (min-width: 760px) {
				&.search-button {
					display: flex;
				}
				> .search-icon-button {
					display: none;
				}
			}
			@media (min-width: 840px) {
				&.settings-button {
					display: flex;
				}
				> .settings-icon-button {
					display: none;
				}
			}
			@media (min-width: 1024px) {
				&.show-config-button,
				&.icon-buttons {
					display: none;
				}
			}
		}
	}
</style>
