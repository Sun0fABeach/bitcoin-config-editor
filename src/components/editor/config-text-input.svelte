<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueText, EditorValueNumber } from '@/types/editor'

	type ConfigTextInputProps = HTMLInputAttributes & {
		value: EditorValueText | EditorValueNumber
		invalidRange?: [number, number]
		wholeNumber?: boolean
	}

	let { value = $bindable(), wholeNumber, ...rest }: ConfigTextInputProps = $props()

	let ref: HTMLInputElement | null = null
	export const focus = () => ref?.focus()

	const isNumberInput = typeof value === 'number' || value === unset[EditorValueType.NUMBER]
	const type = isNumberInput ? 'number' : 'text'
	const inputmode = isNumberInput ? (wholeNumber ? 'numeric' : 'decimal') : 'text'

	const getValue = () => value
	const setValue = (newValue: typeof value) => {
		if (typeof newValue === 'number' && wholeNumber) {
			value = Math.trunc(newValue)
		} else {
			value = newValue
		}
	}
</script>

<div class="container">
	<input
		{type}
		{inputmode}
		bind:value={getValue, setValue}
		bind:this={ref}
		{...rest}
		onclick={(e) => e.stopPropagation()}
	/>
	<div class="underline"></div>
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-flow: column;

		> input {
			color: var(--color-accent1);

			&:hover,
			&:focus {
				+ .underline::after {
					width: 100%;
				}
			}
		}

		> .underline {
			position: relative;
			display: flex;
			justify-content: center;
			height: 1px;
			background-color: var(--color-element-border);

			&::after {
				content: '';
				position: absolute;
				width: 0;
				height: 1px;
				background-color: var(--color-accent1);
				transition: width 0.25s;
			}
		}
	}
</style>
