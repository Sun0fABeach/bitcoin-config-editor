<script lang="ts">
	import { CopySimple } from 'phosphor-svelte'
	import Button from './button.svelte'
	import ConfirmPopover from '@/components/confirm-popover.svelte'
	import useConfigStore from '@/stores/config.svelte'
	import { writeToClipboard } from '@/lib/clipboard'

	const configStore = useConfigStore()
</script>

<ConfirmPopover text="Config copied" onClick={() => writeToClipboard(configStore.text)}>
	{#snippet trigger({ props })}
		<Button {...props} disabled={!configStore.text} icon title="Copy config">
			<CopySimple size={22} />
		</Button>
	{/snippet}
</ConfirmPopover>
