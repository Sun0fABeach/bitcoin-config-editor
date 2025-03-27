<script lang="ts">
	import { UploadSimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import { uploadFile } from '@/lib/file'
	import usePreviewStore from '@/stores/preview.svelte'

	const previewStore = usePreviewStore()

	function upload() {
		uploadFile((uploadedContent: string) => (previewStore.textContent = uploadedContent))
	}
</script>

<Button icon title="upload" onclick={upload}>
	<UploadSimple size={20} weight="regular" />
</Button>
