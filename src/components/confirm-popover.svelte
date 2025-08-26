<script module lang="ts">
	export const openDuration = 2000
</script>

<script lang="ts">
	import type { Snippet } from 'svelte'
	import { slide, fade } from 'svelte/transition'
	import { Popover } from 'bits-ui'
	import useTimeoutFlag from '@/hooks/useTimeoutFlag.svelte'

	type ConfirmPopoverProps = {
		text: string
		onClick: () => Promise<boolean>
		trigger: Snippet<[{ props: Record<string, unknown> }]>
	}

	const { text, onClick, trigger }: ConfirmPopoverProps = $props()

	const popoverOpen = useTimeoutFlag(openDuration)

	const onTriggerClick = async () => {
		if (await onClick()) {
			popoverOpen.callback(true)
		}
	}
</script>

<Popover.Root bind:open={() => popoverOpen.flag, () => {}}>
	<Popover.Trigger onclick={onTriggerClick}>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
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
						<div {...props} class="popover-text" out:slide>{text}</div>
						<div out:fade>
							<Popover.Arrow />
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>

<style lang="postcss">
	.popover-text {
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		background-color: var(--color-popover-background);

		&[data-side='bottom'] {
			transform: translateY(-10px);
		}
		&[data-side='top'] {
			transform: translateY(10px);
		}
	}
</style>
