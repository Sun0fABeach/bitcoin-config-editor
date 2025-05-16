<script lang="ts">
	import { Checkbox, type WithoutChildrenOrChild } from 'bits-ui'
	import { Check } from 'phosphor-svelte'
	import { colors } from '@/globals'

	type CheckboxProps = WithoutChildrenOrChild<Checkbox.RootProps> & {
		backgroundColor?: string
		borderColor?: string
		checkmarkColor?: string
	}

	let {
		checked = $bindable(false),
		backgroundColor = 'transparent',
		borderColor = colors.elementBorder,
		checkmarkColor = colors.textLight,
		...attrs
	}: CheckboxProps = $props()
</script>

<Checkbox.Root bind:checked {...attrs}>
	{#snippet child({ props })}
		<button {...props} style:background-color={backgroundColor} style:border-color={borderColor}>
			<Check weight="bold" color={checkmarkColor} />
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
