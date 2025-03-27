<script lang="ts">
	import { X, UploadSimple, Broom } from 'phosphor-svelte'
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/button.svelte'
	import CopyButton from '@/components/preview-menu/copy-button.svelte'
	import DownloadButton from '@/components/preview-menu/download-button.svelte'

	const previewStore = usePreviewStore()
</script>

<menu>
	<li>
		<Button icon title="close preview" onclick={previewStore.closePreview}>
			<X size={20} weight="regular" />
		</Button>
	</li>
	<li>
		<Button icon title="clear">
			<Broom size={20} weight="regular" />
		</Button>
	</li>
	<li>
		<Button icon title="upload">
			<UploadSimple size={20} weight="regular" />
		</Button>
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
		border-bottom: 1px solid var(--color-text-dark);
		list-style: none;

		> li:nth-child(2) {
			margin-left: auto;
		}
	}

	@media (min-width: 1024px) {
		menu {
			> li:first-child {
				display: none;
			}
		}
	}
</style>
