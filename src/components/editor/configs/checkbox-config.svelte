<script lang="ts">
	import ConfigContainer, {
		type ConfigContainerBaseProps,
	} from '@/components/editor/configs/config-container.svelte'
	import InputRow from '@/components/editor/input-row.svelte'
	import ConfigCheckbox from '@/components/editor/config-checkbox.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueCheckbox } from '@/types/editor'

	type CheckConfigProps = ConfigContainerBaseProps & {
		checked: EditorValueCheckbox
	}

	let { checked = $bindable(), ...info }: CheckConfigProps = $props()

	let checkbox: ConfigCheckbox | null = null

	const onContainerClick = () => {
		checkbox?.focus()
		checked = !checked
	}

	const onDeleteClick = (event: MouseEvent) => {
		event.stopPropagation()
		checked = unset[EditorValueType.CHECKBOX]
	}
</script>

<div>
	<ConfigContainer value={checked} {...info} onclick={onContainerClick}>
		<InputRow deleteDisabled={checked === unset[EditorValueType.CHECKBOX]} ondelete={onDeleteClick}>
			<ConfigCheckbox {checked} bind:this={checkbox} />
		</InputRow>
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
