<script lang="ts">
	import { type EditorValue } from '@/lib/config'
	import { unset } from '@/lib/config'

	interface ConfigTextInputProps {
		value: EditorValue['text'] | EditorValue['number']
		min?: number
		max?: number
		wholeNumbers?: boolean
	}

	let { value = $bindable(), wholeNumbers, ...rest }: ConfigTextInputProps = $props()

	let ref: HTMLInputElement | null = null
	export const focus = () => ref?.focus()

	const type = typeof value === 'number' || value === unset.number ? 'number' : 'text'

	const getValue = () => value
	const setValue = (newValue: typeof value) => {
		if (typeof newValue === 'number' && wholeNumbers) {
			value = Math.trunc(newValue)
		} else {
			value = newValue
		}
	}
</script>

<div class="container">
	<input
		{type}
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
		flex-direction: column;

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
				width: var(--input-highlight-underline-width, 0);
				height: 1px;
				background-color: var(--color-accent1);
				transition: width 0.25s;
			}
		}
	}
</style>
