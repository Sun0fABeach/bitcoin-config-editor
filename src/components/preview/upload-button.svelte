<script lang="ts">
	import { UploadSimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import { uploadFile } from '@/lib/file'

	function upload() {
		uploadFile((uploadedContent: string) => console.log(uploadedContent))
	}
</script>

<Button icon title="upload" onclick={upload}>
	<UploadSimple size={20} weight="regular" />
</Button>
