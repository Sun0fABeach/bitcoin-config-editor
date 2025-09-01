<script lang="ts">
	import { scale } from 'svelte/transition'
	import Button from '@/components/buttons/button.svelte'
	import { getChannel, Message } from '@/lib/message-channel'

	let open = $state(false)
	const channel = getChannel()

	channel.onMessage((msg) => {
		if (msg === Message.NEW_SW_INSTALLED) {
			setTimeout(() => (open = true), 1000)
		} else if (msg === Message.RELOAD) {
			location.reload()
		}
	})

	const onConfirm = () => {
		channel.postMessage(Message.CONFIRM_UPDATE)
	}
</script>

{#if open}
	<div class="version-update-notification" in:scale>
		<span>A new version is available. Refresh the page to update.</span>
		<Button onclick={onConfirm}>Refresh</Button>
	</div>
{/if}

<style lang="postcss">
	.version-update-notification {
		position: fixed;
		bottom: 1.5rem;
		left: 2rem;
		right: 2rem;
		max-width: 50rem;
		margin: 0 auto;
		display: flex;
		flex-flow: column;
		row-gap: 0.625rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-accent2);
		color: black;
		font-weight: 601; /* +1 to make it bolder on android */

		> span {
			text-align: center;
		}

		@media (min-width: 500px) {
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			column-gap: 1rem;

			> span {
				text-align: initial;
			}
		}

		:global .bce-button {
			border: 1px solid var(--color-accent2);
			color: var(--color-accent2);
			font-weight: 600;
		}
	}
</style>
