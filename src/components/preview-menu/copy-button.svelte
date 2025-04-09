<script lang="ts">
	import { slide, fade } from 'svelte/transition'
	import { CopySimple } from 'phosphor-svelte'
	import { Popover } from 'bits-ui'
	import Button from '@/components/button.svelte'
	import usePreviewStore from '@/stores/preview.svelte'

	const previewStore = usePreviewStore()

	let confirmOpen = $state(false)
	let timeoutId: ReturnType<typeof setTimeout> | undefined

	const getConfirmOpen = () => confirmOpen
	const setConfirmOpen = (newOpen: boolean) => {
		if (confirmOpen) {
			clearTimeout(timeoutId)
		} else {
			confirmOpen = newOpen
		}
		timeoutId = setTimeout(() => (confirmOpen = false), 2000)
	}

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(previewStore.textContent)
		setConfirmOpen(true)
	}
</script>

<Popover.Root bind:open={getConfirmOpen, setConfirmOpen}>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button {...props} icon title="copy" onclick={copyToClipBoard}>
				<CopySimple size={20} weight="regular" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		forceMount
		trapFocus={false}
		escapeKeydownBehavior="ignore"
		interactOutsideBehavior="ignore"
		sideOffset={-1}
	>
		{#snippet child({ wrapperProps, props, open })}
			{#if open}
				<div {...wrapperProps}>
					<div {...props} class="popover-text" out:slide>Config copied!</div>
					<div out:fade>
						<Popover.Arrow />
					</div>
				</div>
			{/if}
		{/snippet}
	</Popover.Content>
</Popover.Root>

<style lang="postcss">
	.popover-text {
		padding: 0.5rem;
		border-radius: 0.375rem;
		background-color: var(--color-popover-background);
		transform: translateY(-10px);
	}
</style>
