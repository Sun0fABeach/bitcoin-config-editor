<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigTextInput from '@/components/editor/config-text-input.svelte'
	import { unset, type EditorValue } from '@/lib/config'

	type TextConfigProps = ConfigContainerBaseProps & {
		value: EditorValue['number']
		min?: number
		max?: number
		wholeNumbers?: boolean
	}

	let {
		value = $bindable(unset.number),
		min = -Infinity,
		max = Infinity,
		wholeNumbers = false,
		...info
	}: TextConfigProps = $props()

	let input: ConfigTextInput | null

	const onContainerClick = () => input?.focus()

	const onDeleteClick = (event: MouseEvent) => {
		event.stopPropagation()
		value = unset.number
	}
</script>

<div>
	<ConfigContainer {value} {...info} onclick={onContainerClick}>
		<InputRow deleteDisabled={!value} ondelete={onDeleteClick}>
			<ConfigTextInput {min} {max} {wholeNumbers} bind:value bind:this={input} />
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
