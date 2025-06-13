<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import ConfigCheckbox from '@/components/editor/config-checkbox.svelte'

	type CheckConfigProps = ConfigContainerBaseProps & {
		checked: boolean
	}

	let { checked = $bindable(false), ...info }: CheckConfigProps = $props()

	let checkbox: ConfigCheckbox | null = null

	const onContainerClick = () => {
		checkbox?.focus()
		checked = !checked
	}
</script>

<div>
	<ConfigContainer {...info} onclick={onContainerClick}>
		<ConfigCheckbox {checked} bind:this={checkbox} />
	</ConfigContainer>
</div>

<style lang="postcss">
	div {
		display: contents;
		&:hover {
			--checkbox-highlight-border-offset: -1px;
			--checkbox-highlight-border-color: var(--color-accent1);
		}
	}
</style>
