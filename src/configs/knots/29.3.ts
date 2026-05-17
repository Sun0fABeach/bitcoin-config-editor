import generateConfigKnotsV29_2 from '@/configs/knots/29.2'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigKnotsV29_2()

	patchCategoryOptions(categories, 'General', (options) => ({
		...options,

		dbcache: {
			...options.dbcache,
			description:
				'Maximum database cache size in MiB (minimum 4, default is platform dependent, between 100 and 2048). Make sure you have enough RAM. In addition, unused memory allocated to the mempool is shared with this cache (see <a href="#maxmempool">maxmempool</a>)',
			defaultValue: undefined,
		},

		prune: {
			...options.prune,
			description:
				'Reduce storage requirements by enabling pruning (deleting) of old blocks. This allows the pruneblockchain RPC to be called to delete specific blocks and enables automatic pruning of old blocks if a target size in MiB is provided. This mode is incompatible with <a href="#txindex">txindex</a> and <a href="#coinstatsindex">coinstatsindex</a>. WARNING: Reverting this setting requires re-downloading the entire blockchain. Wallets and indexes should be loaded at startup and kept active while pruning is enabled so they stay synchronized before old block data is deleted; wallets or indexes that fall behind pruned data may require a reindex. (0 = disable pruning blocks, 1 = allow manual pruning via RPC, greater or equal 550 = automatically prune blocks to stay under target size in MiB)',
			defaultValue: undefined,
		},

		softwareexpiry: {
			...options.softwareexpiry,
			defaultValue: '1857151480',
		},
	}))

	patchCategoryOptions(categories, 'Chain Selection', (options) => ({
		...options,

		consensusrules: {
			knotsExclusive: true,
			type: EditorValueType.SELECT,
			title: 'Consensus Rules',
			description: 'Enforce the specified consensus rules. Must be rdts to use this software',
			shortDescription: 'Enforce the specified consensus rules',
			options: [{ value: 'rdts', label: 'RDTS' }],
		},
	}))

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		maxstaleoutbound: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				wholeNumber: true,
			},
			title: 'Max Stale Outbound Connections',
			description:
				'Tolerate at most &lt;n&gt; automatic outbound connections to peers running stale consensus rules. This limit does not apply to connections manually added via <a href="#addnode">addnode</a> or the addnode RPC. Connections to full nodes will still be sought and preferred over stale ones',
			shortDescription:
				'Allow at most <n> auto outbound connections to peers running stale consensus rules',
			defaultValue: '8',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		datacarriersize: {
			...options.datacarriersize,
			typeConstraints: {
				...options.datacarriersize.typeConstraints,
				max: 83,
			},
		},

		subdustfeepenalty: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Sub Dust Fee Penalty',
			description:
				'Reduce effective fee by the dust threshold for each sub-dust output, making dust-creating transactions require higher fees',
			shortDescription: 'Reduce effective fee by the dust threshold for each sub-dust output',
			defaultValue: '1',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => ({
		...options,

		rdts_consent_flag: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				wholeNumber: true,
			},
			title: 'RDTS Consent Flag',
			description: 'Test RDTS consent flag &lt;n&gt;',
			shortDescription: 'Test RDTS consent flag <n>',
			defaultValue: '2',
		},

		stopatheight: {
			...options.stopatheight,
			description:
				'Stop running after reaching the given height in the main chain (0 = disable). Blocks after target height may be processed during shutdown',
			shortDescription:
				'Stop running after reaching the given height in the main chain (0 = disable)',
		},
	}))

	return categories
}
