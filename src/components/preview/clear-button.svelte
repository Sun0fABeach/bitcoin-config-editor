<script lang="ts">
	import { Broom } from 'phosphor-svelte'
	import useConfigStore from '@/stores/config.svelte'
	import Button from '@/components/button.svelte'
	import Dialog from '@/components/dialog.svelte'

	const configStore = useConfigStore()
</script>

<Dialog
	disabled={!configStore.hasUserValues}
	title="Do you really want to clear your config?"
	description="This will reset all options to default values."
	cancelText="Cancel"
	confirmText="Clear"
	onConfirm={configStore.unsetValues}
>
	{#snippet trigger({ props })}
		<Button icon {...props}>
			<Broom size={20} weight="regular" />
		</Button>
	{/snippet}
</Dialog>
