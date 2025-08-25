<script lang="ts">
	import { Broom } from 'phosphor-svelte'
	import useConfigStore from '@/stores/config.svelte'
	import Button from './button.svelte'
	import Dialog from '@/components/dialogs/dialog.svelte'

	const configStore = useConfigStore()
</script>

<Dialog
	disabled={!configStore.hasUserValues}
	title="Do you really want to clear your config?"
	triggerToolTip="clear"
	cancelText="Cancel"
	confirmText="Clear"
	padScrollArea={false}
	onConfirm={configStore.unsetValues}
>
	{#snippet trigger({ props })}
		<Button icon {...props}>
			<Broom size={22} weight="regular" />
		</Button>
	{/snippet}
	{#snippet description()}
		This will reset all options to default values.
	{/snippet}
</Dialog>
