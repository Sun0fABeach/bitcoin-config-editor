<script lang="ts">
	import { DownloadSimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import { downloadFile } from '@/lib/file'
	import { sampleConfigText } from '@/globals'

	function download() {
		downloadFile(sampleConfigText)
	}
</script>

<Button icon title="download" onclick={download}>
	<DownloadSimple size={20} weight="regular" />
</Button>
