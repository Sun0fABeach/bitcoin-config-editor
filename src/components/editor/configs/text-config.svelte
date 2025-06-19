<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueText } from '@/types/editor'

	type TextConfigProps = ConfigContainerBaseProps & {
		value: EditorValueText
	}

	let { value = $bindable(), ...info }: TextConfigProps = $props()

	let input: ConfigTextInput | null

	const onContainerClick = () => input?.focus()

	const onDeleteClick = (event: MouseEvent) => {
		event.stopPropagation()
		value = unset[EditorValueType.TEXT]
	}
</script>

<div>
	<ConfigContainer {value} {...info} onclick={onContainerClick}>
		<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
			<ConfigTextInput bind:value bind:this={input} />
		</InputRow>
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
