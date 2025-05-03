<script lang="ts">
	import { X } from 'phosphor-svelte'
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/button.svelte'
	import ClearButton from '@/components/preview/clear-button.svelte'
	import UploadButton from '@/components/preview/upload-button.svelte'
	import DownloadButton from '@/components/preview/download-button.svelte'
	import CopyButton from '@/components/preview/copy-button.svelte'

	const previewStore = usePreviewStore()
</script>

<menu>
	<li>
		<Button icon title="close preview" onclick={previewStore.closePreview}>
			<X size={20} weight="regular" />
		</Button>
	</li>
	<li>
		<ClearButton />
	</li>
	<li>
		<UploadButton />
	</li>
	<li>
		<DownloadButton />
	</li>
	<li>
		<CopyButton />
	</li>
</menu>

<style lang="postcss">
	menu {
		display: flex;
		align-items: center;
		column-gap: 0.25rem;
		margin: 0;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-layout-border);
		list-style: none;

		> li:nth-child(2) {
			margin-left: auto;
		}

		@media (min-width: 1024px) {
			height: var(--menu-height-desktop);
			padding-top: 0;
			padding-bottom: 0;
			align-items: center;

			> li:first-child {
				display: none;
			}
		}
	}
</style>
