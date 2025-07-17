<script lang="ts">
	import { Accordion } from 'bits-ui'
	import { CaretDown } from 'phosphor-svelte'
	import ConfigList from '@/components/editor/config-list.svelte'
	import KnotsLogo from '@/components/knots-logo.svelte'
	import useOptionsStore from '@/stores/options.svelte'
	import type { CategoryDefinition } from '@/types/config-definition'
	import type { EditorValueAny } from '@/types/editor'

	export interface CategoryProps {
		knotsExclusive?: CategoryDefinition['knotsExclusive']
		title: CategoryDefinition['title']
		description: CategoryDefinition['description']
		configs: CategoryDefinition['configs']
		values: Record<string, EditorValueAny>
		onOpenFinished: () => void
	}

	let {
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
				<ConfigList {...props} bind:values {...{ configs, onOpenFinished }} withTransition />
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
</style>
