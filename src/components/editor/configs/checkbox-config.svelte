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

	const onDeleteClick = () => {
		checked = unset[EditorValueType.CHECKBOX]
	}
</script>

<ConfigContainer value={checked} {...info}>
	<InputRow deleteDisabled={checked === unset[EditorValueType.CHECKBOX]} ondelete={onDeleteClick}>
		<ConfigCheckbox bind:checked />
	</InputRow>
</ConfigContainer>
