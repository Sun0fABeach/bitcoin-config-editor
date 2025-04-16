<script lang="ts">
	import { fade, slide } from 'svelte/transition'
	import { pushState } from '$app/navigation'
	import { page } from '$app/state'
	import { Broom } from 'phosphor-svelte'
	import { AlertDialog } from 'bits-ui'
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/button.svelte'

	const previewStore = usePreviewStore()

	const getDialogOpen = () => !!page.state.dialogOpen
	const setDialogOpen = (newOpen: boolean) => {
		if (newOpen) {
			pushState('', { dialogOpen: newOpen })
		} else {
			history.back()
		}
	}

	const confirmClear = () => {
		previewStore.textContent = ''
		setDialogOpen(false)
	}
</script>

<AlertDialog.Root bind:open={getDialogOpen, setDialogOpen}>
	<AlertDialog.Trigger>
		{#snippet child({ props })}
			<Button icon title="clear" {...props}>
				<Broom size={20} weight="regular" />
			</Button>
		{/snippet}
	</AlertDialog.Trigger>

	<AlertDialog.Portal>
		<AlertDialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} class="dialog-overlay" transition:fade></div>
				{/if}
			{/snippet}
		</AlertDialog.Overlay>

		<AlertDialog.Content forceMount interactOutsideBehavior="close">
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} class="dialog-content" transition:slide>
						<AlertDialog.Title>Do you really want to clear your config?</AlertDialog.Title>
						<AlertDialog.Description>
							{#snippet child()}
								<span class="dialog-description">
									&gt; This will reset all options to default values.
								</span>
							{/snippet}
						</AlertDialog.Description>

						<div class="dialog-buttons">
							<AlertDialog.Cancel>
								{#snippet child({ props })}
									<Button {...props} noBorder>Cancel</Button>
								{/snippet}
							</AlertDialog.Cancel>
							<AlertDialog.Action>
								{#snippet child({ props })}
									<Button {...props} noBorder onclick={confirmClear}>Clear</Button>
								{/snippet}
							</AlertDialog.Action>
						</div>
					</div>
				{/if}
			{/snippet}
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>

<style lang="postcss">
	.dialog-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: black;
		opacity: 0.7;
	}

	.dialog-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border: 2px solid var(--color-element-border);
		border-radius: 0.375rem;
		background-color: var(--color-popover-background);
		line-height: 1.25;

		> .dialog-description {
			margin-top: 0.5rem;
			font-size: 0.875em;
		}

		> .dialog-buttons {
			align-self: flex-end;
			display: flex;
			margin-top: 1rem;
			column-gap: 0.5rem;
		}
	}
</style>
