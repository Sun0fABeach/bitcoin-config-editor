<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Accordion } from 'bits-ui'
	import { CaretDown } from 'phosphor-svelte'
	import TextConfig from '@/components/editor/configs/text-config.svelte'
	import NumberConfig from '@/components/editor/configs/number-config.svelte'
	import MultiTextConfig from '@/components/editor/configs/multi-text-config.svelte'
	import CheckboxConfig from '@/components/editor/configs/checkbox-config.svelte'
	import SelectConfig from '@/components/editor/configs/select-config.svelte'
	import MultiSelectConfig from '@/components/editor/configs/multi-select-config.svelte'
	import { EditorValueType } from '@/enums'
	import type { ConfigDefinition } from '@/types/config-definition'
	import type {
		EditorValueAny,
		EditorValueText,
		EditorValueNumber,
		EditorValueCheckbox,
		EditorValueSelect,
		EditorValueMultiSelect,
		EditorValueMultiText,
	} from '@/types/editor'

	export interface CategoryProps {
		title: string
		description: string
		configs: Record<string, ConfigDefinition>
		values: Record<string, EditorValueAny>
		onOpenFinished: () => void
	}

	const {
		title,
		description,
		configs,
		values = $bindable(),
		onOpenFinished,
	}: CategoryProps = $props()
</script>

<Accordion.Item value={title}>
	<Accordion.Header>
		<Accordion.Trigger>
			{#snippet child({ props })}
				<button {...props}>
					<div class="heading">
						<CaretDown class="caret" weight="duotone" />
						<h2>{title}</h2>
					</div>
					<div class="description">{description}</div>
				</button>
			{/snippet}
		</Accordion.Trigger>
	</Accordion.Header>

	<Accordion.Content forceMount={true}>
		{#snippet child({ props, open })}
			{#if open}
				<ul {...props} transition:slide onintroend={onOpenFinished}>
					{#each Object.entries(configs) as [key, definition] (key)}
						<li id={key}>
							{#if definition.type === EditorValueType.TEXT}
								<TextConfig
									{key}
									title={definition.title}
									description={definition.description}
									defaultValue={definition.defaultValue}
									hex={definition.typeConstraints?.hex}
									minLength={definition.typeConstraints?.minLength}
									maxLength={definition.typeConstraints?.maxLength}
									bind:value={values[key] as EditorValueText}
								/>
							{:else if definition.type === EditorValueType.NUMBER}
								<NumberConfig
									{key}
									title={definition.title}
									description={definition.description}
									defaultValue={definition.defaultValue}
									min={definition.typeConstraints?.min}
									max={definition.typeConstraints?.max}
									invalidRange={definition.typeConstraints?.invalidRange}
									wholeNumber={definition.typeConstraints?.wholeNumber}
									bind:value={values[key] as EditorValueNumber}
								/>
							{:else if definition.type === EditorValueType.CHECKBOX}
								<CheckboxConfig
									{key}
									title={definition.title}
									description={definition.description}
									defaultValue={definition.defaultValue}
									bind:checked={values[key] as EditorValueCheckbox}
								/>
							{:else if definition.type === EditorValueType.SELECT}
								<SelectConfig
									{key}
									title={definition.title}
									description={definition.description}
									defaultValue={definition.defaultValue}
									items={definition.options!}
									bind:value={values[key] as EditorValueSelect}
								/>
							{:else if definition.type === EditorValueType.MULTI_SELECT}
								<MultiSelectConfig
									{key}
									title={definition.title}
									description={definition.description}
									defaultValue={definition.defaultValue}
									items={definition.options!}
									bind:values={values[key] as EditorValueMultiSelect}
								/>
							{:else if definition.type === EditorValueType.MULTI_TEXT}
								<MultiTextConfig
									{key}
									title={definition.title}
									description={definition.description}
									defaultValue={definition.defaultValue}
									bind:values={values[key] as EditorValueMultiText}
								/>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		{/snippet}
	</Accordion.Content>
</Accordion.Item>

<style lang="postcss">
	button {
		display: flex;
		flex-flow: column;
		align-items: start;
		row-gap: 0.5rem;
		width: 100%;
		padding: 1.5rem 0;
		background-color: transparent;
		text-align: left;

		> .heading {
			display: flex;
			align-items: center;
			column-gap: 1rem;

			> h2 {
				font-size: 1.125em;
				transition: transform 0.15s;
			}
		}

		> .description {
			color: var(--color-text-medium);
		}

		:global(.caret) {
			transition: transform 0.3s;
		}
		&[data-state='open'] :global(.caret) {
			transform: rotate(180deg);
		}

		&:hover h2 {
			transform: scale(1.1, 1.1);
		}
	}

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
