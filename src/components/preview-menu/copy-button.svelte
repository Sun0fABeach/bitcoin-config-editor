<script lang="ts">
	import { CopySimple } from 'phosphor-svelte'
	import { Popover } from 'bits-ui'
	import Button from '@/components/button.svelte'
	import { sampleConfigText } from '@/globals'

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

	const copyToClipBoard = () => navigator.clipboard.writeText(sampleConfigText)
</script>

<!-- need to wrap in a container for scoped targeting of bitsui button using CSS selectors-->
<span class="popover-container">
	<Popover.Root bind:open={getConfirmOpen, setConfirmOpen}>
		<Popover.Trigger>
			<Button icon title="copy" onclick={copyToClipBoard}>
				<CopySimple size={20} weight="regular" />
			</Button>
		</Popover.Trigger>
		<Popover.Content
			trapFocus={false}
			escapeKeydownBehavior="ignore"
			interactOutsideBehavior="ignore"
			sideOffset={-1}
		>
			<span class="confirm-text">Config copied!</span>
			<Popover.Arrow />
		</Popover.Content>
	</Popover.Root>
</span>

<style lang="postcss">
	.popover-container {
		display: contents;

		:global([data-popover-trigger]) {
			padding: 0;
			border: none;
			background-color: var(--color-background);
		}
		:global([data-popover-content] > .confirm-text) {
			padding: 0.5rem;
			border-radius: 0.375rem;
			background-color: var(--color-text-dark);
		}
	}
</style>
