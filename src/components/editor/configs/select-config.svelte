<script lang="ts">
	import { useId } from 'bits-ui'
	import ConfigContainer from '@/components/editor/configs/config-container.svelte'
	import ConfigSelect, { type SelectItem } from '@/components/editor/config-select.svelte'

	interface SelectConfigProps {
		title: string
		key: string
		description: string
		items: SelectItem[]
		value: string
	}

	let { value = $bindable(''), items, ...info }: SelectConfigProps = $props()

	let open = $state(false)
	let select: ConfigSelect | null = null
	const containerId = useId()

	const onContainerClick = () => {
		select?.focus()
		open = !open
	}
</script>

<div>
	<ConfigContainer {...info} id={containerId} onclick={onContainerClick}>
		<ConfigSelect bind:open bind:value {items} {containerId} bind:this={select} />
	</ConfigContainer>
</div>

<style lang="postcss">
	div {
		display: contents;
		&:hover {
			--select-highlight-border-expansion: 100%;
		}
	}
</style>
