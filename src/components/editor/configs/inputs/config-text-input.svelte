<script lang="ts">
	import { slide } from 'svelte/transition'
	import validate, { hexPattern, base58Pattern } from '@/lib/validation'
	import { unsetValue } from '@/lib/editor'
	import { EditorValueType } from '@/enums'
	import type { EditorValueText, EditorValueNumber } from '@/types/editor'
	import type { TypeConstraints } from '@/types/config-definition'

	type ConfigTextInputProps = TypeConstraints & {
		value: EditorValueText | EditorValueNumber
	}

	let { value = $bindable(), ...typeConstraints }: ConfigTextInputProps = $props()

	const { hex, base58, minLength, maxLength, wholeNumber, min, max, step } = typeConstraints

	const isNumberInput = typeof value === 'number' || value === unsetValue(EditorValueType.NUMBER)
	const type = isNumberInput ? 'number' : 'text'
	const inputmode = isNumberInput ? (wholeNumber ? 'numeric' : 'decimal') : 'text'
	const pattern = hex ? hexPattern : base58 ? base58Pattern : undefined

	const getValue = () => value
	const setValue = (newValue: typeof value) => {
		if (typeof newValue === 'number' && wholeNumber) {
			value = Math.trunc(newValue)
		} else {
			value = newValue
		}
	}

	const errorMessages = $derived(validate(value, typeConstraints))

	let ref: HTMLInputElement
	export const focus = () => ref?.focus()
</script>

<div class="container">
	<input
		{type}
		{inputmode}
		{min}
		{max}
		{step}
		{pattern}
		minlength={minLength}
		maxlength={maxLength}
		bind:value={getValue, setValue}
		bind:this={ref}
		onkeypress={(e) => e.key === 'Enter' && ref.blur()}
	/>
	<div class="underline"></div>

	{#if errorMessages.length > 0}
		<ul class="error-messages" transition:slide>
			{#each errorMessages as msg (msg)}
				<li>{msg}</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-flow: column;

		@media (800px <= width <= 1024px) or (min-width: calc(800px + 500px)) {
			width: 205px;
		}

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

		> .error-messages {
			display: flex;
			flex-direction: column;
			row-gap: 0.125rem;
			margin-top: 0.375rem;
			font-size: 0.75rem;
			color: var(--color-accent2);
		}
	}
</style>
