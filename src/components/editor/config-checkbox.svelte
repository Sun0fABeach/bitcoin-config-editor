<script lang="ts">
	import Checkbox from '@/components/checkbox.svelte'
	import { colors } from '@/globals'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueCheckbox } from '@/types/editor'

	interface ConfigCheckboxInputProps {
		checked: EditorValueCheckbox
	}

	let { checked = $bindable() }: ConfigCheckboxInputProps = $props()

	let ref: Checkbox | null = null
	export const focus = () => ref?.focus()
</script>

<div>
	<Checkbox
		class="checkbox"
		bind:checked={() => !!checked, (c) => (checked = c)}
		indeterminate={checked === unset[EditorValueType.CHECKBOX]}
		checkmarkColor={colors.accent1}
		bind:this={ref}
	/>
</div>

<style lang="postcss">
	/* wrapper div's sole purpose is to cause tighter scoping of :global() styles */
	div {
		display: contents;

		:global .checkbox {
			position: relative;
		}

		:global .checkbox:focus {
			outline: none;
		}

		:global .checkbox::after {
			content: '';
			position: absolute;
			top: var(--checkbox-highlight-border-offset, -10px);
			bottom: var(--checkbox-highlight-border-offset, -10px);
			left: var(--checkbox-highlight-border-offset, -10px);
			right: var(--checkbox-highlight-border-offset, -10px);
			border: 1px solid var(--checkbox-highlight-border-color, transparent);
			border-radius: 0.25rem;
			transition:
				top 0.3s,
				bottom 0.3s,
				left 0.3s,
				right 0.3s,
				border-color 0.3s;
		}

		:global(.checkbox:hover::after),
		:global(.checkbox:focus::after) {
			top: -1px;
			bottom: -1px;
			left: -1px;
			right: -1px;
			border-color: var(--color-accent1);
		}
	}
</style>
