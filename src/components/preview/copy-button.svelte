<script lang="ts">
	import { CopySimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import usePreviewStore from '@/stores/preview.svelte'
	import ConfirmPopover from '@/components/confirm-popover.svelte'

	const previewStore = usePreviewStore()

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(previewStore.textContent)
	}
</script>

<ConfirmPopover text="Config copied" onClick={copyToClipBoard}>
	{#snippet trigger({ props })}
		<Button {...props} icon title="copy">
			<CopySimple size={20} />
		</Button>
	{/snippet}
</ConfirmPopover>
