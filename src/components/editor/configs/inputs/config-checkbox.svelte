<script lang="ts">
	import Checkbox from '@/components/checkbox.svelte'
	import { colors } from '@/globals'
	import { unsetValue } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueCheckbox } from '@/types/editor'

	interface ConfigCheckboxInputProps {
		checked: EditorValueCheckbox
	}

	let { checked = $bindable() }: ConfigCheckboxInputProps = $props()

	let ref: Checkbox | null = null
	export const focus = () => ref?.focus()
</script>

<div class="container">
	<div class="checkbox-wrapper">
		<Checkbox
			class="checkbox"
			bind:checked={() => !!checked, (c) => (checked = c)}
			indeterminate={checked === unsetValue(EditorValueType.CHECKBOX)}
			checkmarkColor={colors.accent1}
			bind:this={ref}
		/>
		<div class="outline"></div>
	</div>
</div>

<style lang="postcss">
	.container {
		display: flex;
		justify-content: end;
		align-items: center;

		.checkbox-wrapper {
			position: relative;

			.outline {
				position: absolute;
				top: -10px;
				bottom: -10px;
				left: -10px;
				right: -10px;
				cursor: pointer;
				pointer-events: none;
			}

			.outline::after {
				content: '';
				position: absolute;
				inset: 0;
				border: 1px solid transparent;
				border-radius: 0.25rem;
				transition:
					top 0.3s,
					bottom 0.3s,
					left 0.3s,
					right 0.3s,
					border-color 0.3s;
			}

			&:hover > .outline::after,
			:global(.checkbox:focus + .outline::after) {
				inset: 10px;
				border-color: var(--color-accent1);
			}

			:global .checkbox:focus {
				outline: none;
			}
		}
	}
</style>
