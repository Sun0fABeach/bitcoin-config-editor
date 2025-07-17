<script lang="ts">
	import { slide } from 'svelte/transition'
	import TextConfig from '@/components/editor/configs/text-config.svelte'
	import NumberConfig from '@/components/editor/configs/number-config.svelte'
	import MultiTextConfig from '@/components/editor/configs/multi-text-config.svelte'
	import CheckboxConfig from '@/components/editor/configs/checkbox-config.svelte'
	import SelectConfig from '@/components/editor/configs/select-config.svelte'
	import MultiSelectConfig from '@/components/editor/configs/multi-select-config.svelte'
	import { EditorValueType } from '@/enums'
	import type { CategoryDefinition } from '@/types/config-definition'
	import type {
		EditorValueAny,
		EditorValueText,
		EditorValueNumber,
		EditorValueCheckbox,
		EditorValueSelect,
		EditorValueMultiSelect,
		EditorValueMultiText,
	} from '@/types/editor'

	interface ConfigListProps {
		withTransition?: boolean
		configs: CategoryDefinition['configs']
		values: Record<string, EditorValueAny>
		onOpenFinished?: () => void
		[index: string]: unknown
	}

	const {
		withTransition,
		configs,
		values = $bindable(),
		onOpenFinished,
		...attrs
	}: ConfigListProps = $props()
</script>

<ul
	{...attrs}
	transition:slide={withTransition ? undefined : { duration: 0 }}
	onintroend={onOpenFinished}
>
	{#each Object.entries(configs) as [key, definition] (key)}
		{@const { type, typeConstraints, options, ...info } = definition}

		<li class="config-list-item" id={key}>
			{#if definition.type === EditorValueType.TEXT}
				<TextConfig
					{key}
					{...info}
					hex={typeConstraints?.hex}
					base58={typeConstraints?.base58}
					minLength={typeConstraints?.minLength}
					maxLength={typeConstraints?.maxLength}
					bind:value={values[key] as EditorValueText}
				/>
			{:else if type === EditorValueType.NUMBER}
				<NumberConfig
					{key}
					{...info}
					min={typeConstraints?.min}
					max={typeConstraints?.max}
					step={typeConstraints?.step}
					invalidRange={typeConstraints?.invalidRange}
					wholeNumber={typeConstraints?.wholeNumber}
					bind:value={values[key] as EditorValueNumber}
				/>
			{:else if type === EditorValueType.CHECKBOX}
				<CheckboxConfig {key} {...info} bind:checked={values[key] as EditorValueCheckbox} />
			{:else if type === EditorValueType.SELECT}
				<SelectConfig
					{key}
					{...info}
					items={options!}
					bind:value={values[key] as EditorValueSelect}
				/>
			{:else if type === EditorValueType.MULTI_SELECT}
				<MultiSelectConfig
					{key}
					{...info}
					items={options!}
					bind:values={values[key] as EditorValueMultiSelect}
				/>
			{:else if type === EditorValueType.MULTI_TEXT}
				<MultiTextConfig {key} {...info} bind:values={values[key] as EditorValueMultiText} />
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		display: flex;
		flex-flow: column;
		row-gap: 1.5rem;
		padding-bottom: 1.5rem;

		> li {
			display: flex;
			flex-flow: column;
			border-left: 1px dashed var(--color-accent2);
		}
	}
</style>
