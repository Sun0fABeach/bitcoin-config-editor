<script lang="ts">
	import { type Snippet } from 'svelte'
	import { fade, slide } from 'svelte/transition'
	import { pushState } from '$app/navigation'
	import { page } from '$app/state'
	import { AlertDialog, useId } from 'bits-ui'
	import { watch } from 'runed'
	import ScrollArea from '@/components/scroll-area.svelte'
	import Button from '@/components/button.svelte'

	interface DialogProps {
		trigger?: Snippet<[{ props: Record<string, unknown> }]>
		triggerToolTip?: string
		open?: boolean
		disabled?: boolean
		title: string
		description: Snippet
		cancelText: string
		confirmText: string
		onCancel?: () => void
		onConfirm: () => void
	}

	let {
		trigger,
		triggerToolTip,
		open = $bindable(false),
		disabled = false,
		title,
		description,
		cancelText,
		confirmText,
		onCancel,
		onConfirm,
	}: DialogProps = $props()

	// prevent flash of scrollbar during opening transition by setting to 'scroll' during that time
	let scrollAreaType = $state<'scroll' | 'auto'>('scroll')

	const dialogOpenPageStateKey = `dialog-open-${useId()}`
	const dialogOpenPageState = $derived(!!page.state[dialogOpenPageStateKey])

	watch(
		() => open,
		() => setPageState(open),
	)
	watch(
		() => dialogOpenPageState,
		() => {
			if (open && !dialogOpenPageState) {
				onCancel?.() // called when close triggered by browser-back
			}
			open = dialogOpenPageState
		},
	)

	const setPageState = (dialogOpen: boolean) => {
		if (dialogOpen === dialogOpenPageState) {
			return // we land here if open state got changed by browser back/forward. nothing left to do
		}
		if (dialogOpen) {
			pushState('', { [dialogOpenPageStateKey]: true })
		} else {
			history.back()
		}
	}

	const cancel = () => {
		onCancel?.()
		open = false
	}
	const confirm = () => {
		onConfirm()
		open = false
	}
</script>

<AlertDialog.Root bind:open>
	{#if trigger}
		<AlertDialog.Trigger {disabled} title={triggerToolTip}>
			{#snippet child({ props })}
				{@render trigger({ props })}
			{/snippet}
		</AlertDialog.Trigger>
	{/if}

	<AlertDialog.Portal>
		<AlertDialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} class="dialog-overlay" transition:fade></div>
				{/if}
			{/snippet}
		</AlertDialog.Overlay>

		<AlertDialog.Content forceMount interactOutsideBehavior="close" onInteractOutside={cancel}>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class="dialog-content"
						transition:slide
						onintrostart={() => (scrollAreaType = 'scroll')}
						onintroend={() => (scrollAreaType = 'auto')}
					>
						<AlertDialog.Title>{title}</AlertDialog.Title>
						<AlertDialog.Description>
							{#snippet child()}
								<ScrollArea type={scrollAreaType}>
									<div class="dialog-description">
										{@render description()}
									</div>
								</ScrollArea>
							{/snippet}
						</AlertDialog.Description>

						<div class="dialog-buttons">
							<AlertDialog.Cancel>
								{#snippet child({ props })}
									<Button {...props} noBorder onclick={cancel}>{cancelText}</Button>
								{/snippet}
							</AlertDialog.Cancel>
							<AlertDialog.Action>
								{#snippet child({ props })}
									<Button {...props} noBorder onclick={confirm}>{confirmText}</Button>
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
		inset: 0;
		background-color: black;
		opacity: 0.7;
	}

	.dialog-content {
		--scroll-area-padding: 0 calc(0.75rem + var(--scrollbar-width)) 0 0;

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 90%;
		max-height: 90%;
		display: flex;
		flex-flow: column;
		padding: 1rem;
		border: 2px solid var(--color-element-border);
		border-radius: 0.375rem;
		background-color: var(--color-popover-background);
		line-height: 1.25;

		.dialog-description {
			display: flex;
			flex-flow: column;
			row-gap: 0.875rem;
			margin-top: 0.5rem;
			font-size: 0.875em;
			color: hsl(from var(--color-accent2) h s l / 0.875);
		}

		> .dialog-buttons {
			align-self: end;
			display: flex;
			column-gap: 0.5rem;
			margin-top: 1rem;
		}
	}
</style>
