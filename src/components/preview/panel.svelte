<script lang="ts">
	import { X } from 'phosphor-svelte'
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/buttons/button.svelte'
	import ClearButton from '@/components/buttons/clear-button.svelte'
	import UploadButton from '@/components/buttons/upload-button.svelte'
	import DownloadButton from '@/components/buttons/download-button.svelte'
	import CopyButton from '@/components/buttons/copy-button.svelte'

	const previewStore = usePreviewStore()
</script>

<menu>
	<li>
		<Button icon title="close preview" onclick={previewStore.closePreview}>
			<X size={22} weight="regular" />
		</Button>
	</li>
	<li>
		<CopyButton />
	</li>
	<li>
		<DownloadButton />
	</li>
	<li>
		<UploadButton />
	</li>
	<li>
		<ClearButton />
	</li>
</menu>

<style lang="postcss">
	menu {
		display: flex;
		align-items: center;
		column-gap: 0.25rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-layout-border);

		> li:nth-child(2) {
			margin-left: auto;
		}

		@media (min-width: 1024px) {
			flex: 0 0 var(--menu-height-desktop);

			> li:first-child {
				display: none;
			}
		}
	}
</style>
