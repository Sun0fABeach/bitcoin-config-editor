<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'

	type TextConfigProps = ConfigContainerBaseProps & {
		value: string
	}

	let { value = $bindable(''), ...info }: TextConfigProps = $props()

	let input: ConfigTextInput | null
	const onContainerClick = () => input?.focus()
</script>

<div>
	<ConfigContainer {...info} onclick={onContainerClick}>
		<ConfigTextInput bind:value bind:this={input} />
	</ConfigContainer>
</div>

<style lang="postcss">
	div {
		display: contents;
		&:hover {
			--input-highlight-underline-width: 100%;
		}
	}
</style>
