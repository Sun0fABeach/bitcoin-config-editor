<script lang="ts">
	import { Checkbox, type WithoutChildrenOrChild } from 'bits-ui'
	import { Check, Minus } from 'phosphor-svelte'
	import { colors } from '@/globals'

	type CheckboxProps = WithoutChildrenOrChild<Checkbox.RootProps> & {
		backgroundColor?: string
		borderColor?: string
		checkmarkColor?: string
	}

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
		backgroundColor = 'transparent',
		borderColor = colors.elementBorder,
		checkmarkColor = colors.textLight,
		...attrs
	}: CheckboxProps = $props()

	let ref = $state<HTMLButtonElement | null>(null)

	export function focus() {
		ref?.focus()
	}
</script>

<Checkbox.Root {...attrs} bind:checked bind:indeterminate bind:ref>
	{#snippet child({ props, indeterminate })}
		<button {...props} style:background-color={backgroundColor} style:border-color={borderColor}>
			{#if indeterminate}
				<Minus weight="bold" color={checkmarkColor} />
			{:else}
				<Check weight="bold" color={checkmarkColor} />
			{/if}
		</button>
	{/snippet}
</Checkbox.Root>

<style lang="postcss">
	button {
		width: 25px;
		height: 25px;
		padding-top: 2px;
		border-width: 1px;
		border-style: solid;
		border-radius: 0.25rem;

		&[data-state='unchecked'] > :global(:first-child) {
			visibility: hidden;
		}
	}
</style>
