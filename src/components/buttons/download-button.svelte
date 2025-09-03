<script lang="ts">
	import { DownloadSimple } from 'phosphor-svelte'
	import Button from './button.svelte'
	import { downloadFile } from '@/lib/file'
	import useConfigStore from '@/stores/config.svelte'

	const configStore = useConfigStore()

	function download() {
		downloadFile(configStore.text)
	}
</script>

<Button icon title="Download config file" disabled={!configStore.text} onclick={download}>
	<DownloadSimple size={22} weight="regular" />
</Button>
