<script lang="ts">
	import { fade, slide } from 'svelte/transition'
	import { pushState } from '$app/navigation'
	import { page } from '$app/state'
	import { Broom } from 'phosphor-svelte'
	import { Dialog } from 'bits-ui'
	import usePreviewStore from '@/stores/preview.svelte'
	import Button from '@/components/button.svelte'

	const previewStore = usePreviewStore()

	const getDialogOpen = () => !!page.state.dialogOpen
	const setDialogOpen = (newOpen: boolean) => {
		pushState('', { dialogOpen: newOpen })
	}

	const confirmClear = () => {
		previewStore.textContent = ''
		setDialogOpen(false)
	}
</script>

<Dialog.Root bind:open={getDialogOpen, setDialogOpen}>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button icon title="clear" {...props}>
				<Broom size={20} weight="regular" />
			</Button>
		{/snippet}
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} class="dialog-overlay" transition:fade></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>

		<Dialog.Content forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} class="dialog-content" transition:slide>
						<Dialog.Title>Do you really want to clear your config?</Dialog.Title>
						<Dialog.Description>
							{#snippet child()}
								<span class="dialog-description">
									-&gt; This will reset all options to default values.
								</span>
							{/snippet}
						</Dialog.Description>

						<div class="dialog-buttons">
							<Dialog.Close>
								{#snippet child({ props })}
									<Button {...props} noBorder>Cancel</Button>
								{/snippet}
							</Dialog.Close>
							<Button noBorder onclick={confirmClear}>Clear</Button>
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

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
		border: 2px solid var(--color-text-medium);
		border-radius: 0.375rem;
		background-color: var(--color-popover-background);

		> .dialog-description {
			margin-top: 0.375rem;
			font-size: 0.875rem;
		}

		> .dialog-buttons {
			align-self: flex-end;
			display: flex;
			margin-top: 1rem;
			column-gap: 0.5rem;
		}
	}
</style>
