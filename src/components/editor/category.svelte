<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Accordion } from 'bits-ui'
	import { CaretDown } from 'phosphor-svelte'
	import TextConfig from '@/components/editor/configs/text.svelte'
	import CheckConfig from '@/components/editor/configs/check.svelte'

	type CategoryProps = {
		title: string
		description: string
	}

	const { title, description }: CategoryProps = $props()

	let textConfig1 = $state('foobar')
	let textConfig2 = $state('hello world etc pp')
	let boolConfig = $state(true)
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
				<ul {...props} transition:slide>
					<li>
						<TextConfig
							title="Alert Notification"
							key="alertnotify"
							description="Execute command when an alert is raised (%s in cmd is replaced by message)"
							bind:value={textConfig1}
						/>
					</li>
					<li>
						<CheckConfig
							title="Blocks Data XOR"
							key="blocksxor"
							description="Whether an XOR-key applies to blocksdir *.dat files. The created XOR-key will be zeros for an existing blocksdir or when `-blocksxor=0` is set, and random for a freshly initialized blocksdir"
							bind:checked={boolConfig}
						/>
					</li>
					<li>
						<TextConfig
							title="Block Notification"
							key="blocknotify"
							description="Execute command when the best block changes (%s in cmd is replaced by block hash). Filler filler filler"
							bind:value={textConfig2}
						/>
					</li>
				</ul>
			{/if}
		{/snippet}
	</Accordion.Content>
</Accordion.Item>

<style lang="postcss">
	button {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		row-gap: 0.5rem;
		width: 100%;
		padding: 1.5rem 0;
		background-color: transparent;

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
			text-align: left;
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
		flex-direction: column;
		row-gap: 1.125rem;
		padding-bottom: 1.5rem;

		> li {
			display: flex;
			flex-direction: column;
			border-left: 1px dashed var(--color-accent2);
		}
	}
</style>
