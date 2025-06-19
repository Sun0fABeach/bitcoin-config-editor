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
	import { unset } from '@/lib/config'

	export interface CategoryProps {
		title: string
		description: string
	}

	const { title, description }: CategoryProps = $props()

	let numberConfig = $state(unset.number)
	let numberConfig2 = $state(unset.number)
	let textConfig2 = $state(unset.text)
	let multiTextConfig = $state(unset.multiText())
	// let multiTextConfig = $state(['one', 'two'])
	let boolConfig = $state(unset.checkbox)

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
			value: 'basic',
			label: 'Basic',
		},
		{
			value: 'v0',
			label: 'v0',
		},
	]
	let selected = $state(unset.select)
	const selectConfig2 = [
		{
			value: '0',
			label: '0',
		},
		{
			value: '1',
			label: '1',
		},
		{
			value: '2',
			label: '2',
		},
		{
			value: '3',
			label: '3',
		},
		{
			value: '4',
			label: '4',
		},
	]
	let selected2 = $state(unset.select)

	const multiSelectConfig = [
		{
			value: 'ipv4',
			label: 'IPv4',
		},
		{
			value: 'ipv6',
			label: 'IPv6',
		},
		{
			value: 'onion',
			label: 'Tor',
		},
		{
			value: 'i2p',
			label: 'I2P',
		},
		{
			value: 'cjdns',
			label: 'cjdns',
		},
	]
	// let multiSelected = $state(['onion', 'ipv4'])
	let multiSelected = $state(unset.multiSelect())
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
					<li id="checkblocks">
						<NumberConfig
							title="Check Blocks"
							key="checkblocks"
							description="How many blocks to check at startup (0 = all)"
							defaultValue="6"
							min={0}
							wholeNumbers
							bind:value={numberConfig}
						/>
					</li>
					<li id="minrelaytxfee">
						<NumberConfig
							title="Minimum Transaction Relay Fee"
							key="minrelaytxfee"
							description="Fees (in BTC/kvB) smaller than this are considered zero fee for relaying, mining and transaction creation"
							defaultValue="0.00001"
							min={0}
							bind:value={numberConfig2}
						/>
					</li>
					<li id="loadblock">
						<MultiTextConfig
							title="Import Blocks From File"
							key="loadblock"
							description="Imports blocks from external blk000??.dat file on startup. This option can be set multiple times with different file values"
							bind:values={multiTextConfig}
						/>
					</li>
					<li id="blocksxor">
						<CheckboxConfig
							title="Blocks Data XOR"
							key="blocksxor"
							description="Whether an XOR-key applies to blocksdir *.dat files. The created XOR-key will be zeros for an existing blocksdir or when `-blocksxor=0` is set, and random for a freshly initialized blocksdir"
							defaultValue="1"
							bind:checked={boolConfig}
						/>
					</li>
					<li id="onlynet">
						<MultiSelectConfig
							title="Only Use Specific Network"
							key="onlynet"
							description="Make automatic outbound connections only to the selected network. Inbound and manual connections are not affected by this option. It can be specified multiple times to allow multiple networks."
							items={multiSelectConfig}
							bind:values={multiSelected}
						/>
					</li>
					<li id="assumevalid">
						<TextConfig
							title="Assume Valid Chain History"
							key="assumevalid"
							description="If this block is in the chain assume that it and its ancestors are valid and potentially skip their script verification (0 to verify all)"
							defaultValue={{
								mainnet: '000000000000000000006e926737e6a349f7581525ad36e743dfe5f4bc3abbb7',
								testnet3: '000000000000000465b1a66c9f386308e8c75acef9201f3f577811da09fc90ad',
								testnet4: '000000005be348057db991fa5d89fe7c4695b667cfb311391a8db374b6f681fd',
								signet: '0000014aad1d58dddcb964dd749b073374c6306e716b22f573a2efe68d414539',
							}}
							bind:value={textConfig2}
						/>
					</li>
					<li id="blockfilterindex">
						<SelectConfig
							title="Block Filter Index"
							key="blockfilterindex"
							description="Maintain an index of compact filters by block. If set to 1, certain indexes are enabled (currently just basic)"
							defaultValue="0"
							items={selectConfig}
							bind:value={selected}
						/>
					</li>
					<li id="checklevel">
						<SelectConfig
							title="Check Blocks Level"
							key="checklevel"
							description="How thorough the block verification of <a href='#checkblocks'>checkblocks</a> is: level 0 reads the blocks from disk, level 1 verifies block validity, level 2 verifies undo data, level 3 checks disconnection of tip blocks, level 4 tries to reconnect the blocks, each level includes the checks of the previous levels"
							defaultValue="3"
							items={selectConfig2}
							bind:value={selected2}
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
