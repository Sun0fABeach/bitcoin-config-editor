<script lang="ts">
	import { DownloadSimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import { downloadFile } from '@/lib/file'
	import usePreviewStore from '@/stores/preview.svelte'

	const previewStore = usePreviewStore()

	function download() {
		downloadFile(previewStore.textContent)
	}
</script>

<Button icon title="download" onclick={download}>
	<DownloadSimple size={20} weight="regular" />
</Button>
