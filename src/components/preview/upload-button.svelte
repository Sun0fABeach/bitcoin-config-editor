<script lang="ts">
	import { UploadSimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import Dialog from '@/components/dialogs/dialog.svelte'
	import CompatibilityDialog from '@/components/dialogs/compatibility-dialog.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { uploadConfig } from '@/lib/configs'

	const configStore = useConfigStore()

	let showFileUploadError = $state(false)
	let fileUploadErrorMsg = $state('')
	let selectedFileName = $state('')

	async function upload() {
		try {
			const { values, fileName } = await uploadConfig()
			selectedFileName = fileName
			showFileUploadError = false
			configStore.replaceValues(values)
		} catch (e) {
			fileUploadErrorMsg = e as string
			showFileUploadError = true
		}
	}
</script>

<Button icon title="upload" onclick={upload}>
	<UploadSimple size={20} weight="regular" />
</Button>

<Dialog
	bind:open={showFileUploadError}
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

<CompatibilityDialog
	title="Do you really want to apply this config?"
	issues={configStore.replaceValuesIssues}
>
	Your selected config file <span class="file-name">{selectedFileName}</span> has compatibility issues.
	If you choose to proceed, the following values will be removed from the config.
</CompatibilityDialog>

<style lang="postcss">
	.file-name {
		color: var(--color-accent1-light);
	}
</style>
