<script lang="ts">
	import { UploadSimple } from 'phosphor-svelte'
	import Button from './button.svelte'
	import Dialog from '@/components/dialogs/dialog.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { uploadConfig } from '@/lib/configs'

	const configStore = useConfigStore()

	let showFileUploadError = $state(false)
	let fileUploadErrorMsg = $state('')

	async function upload() {
		try {
			const { values } = await uploadConfig()
			showFileUploadError = false
			configStore.replaceValues(values)
		} catch (e) {
			fileUploadErrorMsg = e as string
			showFileUploadError = true
		}
	}
</script>

<Button icon title="upload" onclick={upload}>
	<UploadSimple size={22} weight="regular" />
</Button>

<Dialog
	bind:open={showFileUploadError}
	padScrollArea
	title="Something went wrong"
	cancelText="Cancel"
	confirmText="Try again"
	onCancel={() => (showFileUploadError = false)}
	onConfirm={upload}
>
	{#snippet description()}
		{fileUploadErrorMsg}
	{/snippet}
</Dialog>
