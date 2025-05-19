<script lang="ts">
	import ConfigContainer from '@/components/editor/configs/config-container.svelte'
	import Checkbox from '@/components/checkbox.svelte'
	import { colors } from '@/globals'

	type CheckConfigProps = {
		title: string
		key: string
		description: string
		checked: boolean
	}

	let { checked = $bindable(false), ...info }: CheckConfigProps = $props()

	const onContainerClick = () => (checked = !checked)
</script>

<div>
	<ConfigContainer class="check-config-container" {...info} onclick={onContainerClick}>
		<Checkbox class="checkbox" {checked} checkmarkColor={colors.accent1} />
	</ConfigContainer>
</div>

<style lang="postcss">
	div {
		/* wrapper div's sole purpose is to cause tighter scoping of :global() styles */
		display: contents;

		:global .checkbox {
			position: relative;
			flex-shrink: 0;
		}

		:global .checkbox:focus {
			outline: none;
		}

		:global .checkbox::after {
			content: '';
			position: absolute;
			top: -10px;
			bottom: -10px;
			left: -10px;
			right: -10px;
			border: 1px solid transparent;
			border-radius: 0.25rem;
			transition:
				top 0.3s,
				bottom 0.3s,
				left 0.3s,
				right 0.3s,
				border-color 0.3s;
		}

		:global(.check-config-container:hover .checkbox::after),
		:global(.check-config-container:focus-within .checkbox::after) {
			top: -1px;
			bottom: -1px;
			left: -1px;
			right: -1px;
			border-color: var(--color-accent1);
		}
	}
</style>
