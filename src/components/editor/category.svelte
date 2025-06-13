<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Accordion, useId } from 'bits-ui'
	import { CaretDown } from 'phosphor-svelte'
	import TextConfig from '@/components/editor/configs/text-config.svelte'
	import MultiTextConfig, {
		type MultiTextEntry,
	} from '@/components/editor/configs/multi-text-config.svelte'
	import ToggleConfig from '@/components/editor/configs/toggle-config.svelte'
	import SelectConfig from '@/components/editor/configs/select-config.svelte'

	export interface CategoryProps {
		title: string
		description: string
	}

	const { title, description }: CategoryProps = $props()

	let textConfig1 = $state('foobar')
	let textConfig2 = $state('hello world etc pp')
	let multiTextConfig = $state<MultiTextEntry[]>([{ id: useId(), text: '' }])
	let boolConfig = $state(true)
	const selectConfig = [
		{
			value: '0',
			label: 'Disable',
		},
		{
			value: '1',
			label: 'Enable',
		},
		{
			value: 'v0',
			label: 'v0',
		},
		{
			value: 'basic',
			label: 'Basic',
		},
		{
			value: 'ultralong',
			label: 'Ultra long test label to check overflow',
		},
	]
	let selected = $state(selectConfig[0].value)
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
							defaultValue="testDefault"
							bind:value={textConfig1}
						/>
					</li>
					<li>
						<MultiTextConfig
							title="Import Blocks From File"
							key="loadblock"
							description="Imports blocks from external blk000??.dat file on startup. This option can be set multiple times with different file values"
							bind:entries={multiTextConfig}
						/>
					</li>
					<li>
						<ToggleConfig
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
							description="Execute command when the best block changes (%s in cmd is replaced by block hash)"
							bind:value={textConfig2}
						/>
					</li>
					<li>
						<SelectConfig
							title="Block Filter Index"
							key="blockfilterindex"
							description="Maintain an index of compact filters by block. If set to 1, certain indexes are enabled (currently just basic)"
							items={selectConfig}
							bind:value={selected}
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
		flex-direction: column;
		row-gap: 1.5rem;
		padding-bottom: 1.5rem;

		> li {
			display: flex;
			flex-direction: column;
			border-left: 1px dashed var(--color-accent2);
		}
	}
</style>
