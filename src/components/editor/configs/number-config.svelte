<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueNumber } from '@/types/editor'

	type TextConfigProps = ConfigContainerBaseProps & {
		value: EditorValueNumber
		min?: number
		max?: number
		invalidRange?: [number, number]
		wholeNumber?: boolean
	}

	let {
		value = $bindable(),
		min = -Infinity,
		max = Infinity,
		invalidRange,
		wholeNumber = false,
		...info
	}: TextConfigProps = $props()

	let input: ConfigTextInput | null

	const onContainerClick = () => input?.focus()

	const onDeleteClick = (event: MouseEvent) => {
		event.stopPropagation()
		value = unset[EditorValueType.NUMBER]
	}
</script>

<div>
	<ConfigContainer {value} {...info} onclick={onContainerClick}>
		<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
			<ConfigTextInput {min} {max} {invalidRange} {wholeNumber} bind:value bind:this={input} />
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
