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
	import KnotsLogo from '@/components/knots-logo.svelte'
	import useOptionsStore from '@/stores/options.svelte'
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

	export interface CategoryProps {
		knotsExclusive?: CategoryDefinition['knotsExclusive']
		title: CategoryDefinition['title']
		description: CategoryDefinition['description']
		configs: CategoryDefinition['configs']
		values: Record<string, EditorValueAny>
		onOpenFinished: () => void
	}

	const {
		knotsExclusive,
		title,
		description,
		configs,
		values = $bindable(),
		onOpenFinished,
	}: CategoryProps = $props()

	const optionsStore = useOptionsStore()
	const showKnotsExclusivity = $derived(knotsExclusive && optionsStore.highlightKnotsExclusives)
</script>

<Accordion.Item value={title}>
	<Accordion.Header>
		<Accordion.Trigger>
			{#snippet child({ props })}
				<button {...props}>
					<div class="heading">
						<CaretDown class="caret" weight="duotone" />
						<h2>{title}</h2>
						{#if showKnotsExclusivity}
							<KnotsLogo alt="Knots exclusive" title="Knots exclusive" />
						{/if}
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
								<MultiTextConfig
									{key}
									{...info}
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

			> h2 {
				margin-left: 1rem;
				font-size: 1.125em;
				transition: transform 0.15s;
			}
			:global > img {
				height: 1.375rem;
				margin-left: 0.75rem;
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
