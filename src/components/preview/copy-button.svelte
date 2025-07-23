<script lang="ts">
	import { CopySimple } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import ConfirmPopover from '@/components/confirm-popover.svelte'

	const configStore = useConfigStore()

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(configStore.text)
	}
</script>

<ConfirmPopover text="Config copied" onClick={copyToClipBoard}>
	{#snippet trigger({ props })}
		<Button {...props} disabled={!configStore.text} icon title="copy">
			<CopySimple size={20} />
		</Button>
	{/snippet}
</ConfirmPopover>
