<script lang="ts">
	import type { Snippet } from 'svelte'
	import { slide } from 'svelte/transition'
	import { Trash } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'

	interface InputRowProps {
		withTransition?: boolean
		deleteDisabled: boolean
		ondelete: (event: MouseEvent) => void
		children: Snippet
	}

	const { withTransition = false, deleteDisabled, ondelete, children }: InputRowProps = $props()
</script>

<div
	class="input-row"
	role="button"
	tabindex="-1"
	transition:slide={{ duration: withTransition ? undefined : 0 }}
>
	{@render children()}
	<Button icon noBorder disabled={deleteDisabled} onclick={ondelete}>
		<Trash weight="light" />
	</Button>
</div>

<style lang="postcss">
	.input-row {
		display: flex;
		column-gap: 0.75rem;

		&:not(:first-child) {
			padding-top: calc(var(--input-row-gap) / 2);
		}
		&:not(:last-child) {
			padding-bottom: calc(var(--input-row-gap) / 2);
		}

		:global > :first-child {
			flex: 1;
		}

		:global > :first-child > .trigger-button {
			flex: 1;
		}
	}
</style>
