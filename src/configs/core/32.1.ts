import generateConfigCoreV31_2 from '@/configs/core/31.2'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigCoreV31_2()

	patchCategoryOptions(categories, 'General', (options) => ({
		...options,

		assumevalid: {
			...options.assumevalid,
			defaultValue: {
				mainnet: '00000000000000000000748969ec33043c0e52a763c6dd5193861f559f2c72e3',
				testnet3: '00000000b318a3703d14a844c55ef507f4c2fc8f8766e24271fd43c180c51637',
				testnet4: '0000000021df65b91665a342e26ceb05e54826ad7d8fcd40316230058fa3b865',
				signet: '00000002a5e0ba0498f1e9f4591af0b66b63c654665efe65206fd0ae7bbaf923',
			},
		},

		blocknotify: {
			...options.blocknotify,
			description:
				'Execute command when the best block changes (%s in cmd is replaced by block hash). Not run for blocks connected during initial block download or reindexing',
		},

		loadblock: {
			...options.loadblock,
			description:
				'Import blocks from an external blk000??.dat file on startup. Obfuscated blocks are not supported. This option can be set multiple times with different file values',
		},

		minimumchainwork: {
			...options.minimumchainwork,
			defaultValue: {
				mainnet: '000000000000000000000000000000000000000145ec036acc5ba740052af1a0',
				testnet3: '0000000000000000000000000000000000000000000017f49f702147f10c0eb6',
				testnet4: '000000000000000000000000000000000000000000000e346a558455ade8eca9',
				signet: '00000000000000000000000000000000000000000000000000001090e9dc1520',
			},
		},

		prevoutfetchthreads: {
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				max: 16,
				wholeNumber: true,
			},
			title: 'Prevout Fetch Threads',
			description:
				'Set the number of threads used to prefetch block input prevouts from the chainstate database (0 disables)',
			shortDescription: 'Number of threads used to prefetch block input prevouts',
			defaultValue: '8',
		},

		prune: {
			...options.prune,
			description:
				'Reduce storage requirements by enabling pruning (deleting) of old blocks. This allows the pruneblockchain RPC to be called to delete specific blocks and enables automatic pruning of old blocks if a target size in MiB is provided. This mode is incompatible with <a href="#txindex">txindex</a> and <a href="#coinstatsindex">coinstatsindex</a>. WARNING: Reverting this setting requires re-downloading the entire blockchain. Wallets and indexes should be loaded at startup and kept active while pruning is enabled so they stay synchronized before old block data is deleted; wallets or indexes that fall behind pruned data may require a reindex. (0 = disable pruning blocks, 1 = allow manual pruning via RPC, greater or equal 550 = automatically prune blocks to stay under target size in MiB)',
		},
	}))

	patchCategoryOptions(categories, 'Chain Selection', (options) => ({
		...options,

		vbparams: {
			...options.vbparams,
			description:
				'Use given start/end times for specified version bits deployment. Format: &lt;deployment:start:end[:min_activation_height]&gt;. Can be set multiple times. (test-only)',
		},
	}))

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		inboundrelaypercent: {
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				max: 100,
				wholeNumber: true,
			},
			title: 'Inbound Relay Percentage',
			description:
				'Permit a maximum percent of inbound connections to relay transactions to limit memory utilization',
			shortDescription: 'Permit a max percent of inbound connections to relay txs',
			defaultValue: '50',
		},

		maxconnections: {
			...options.maxconnections,
			typeConstraints: {
				...options.maxconnections.typeConstraints,
				max: 2000,
			},
			description:
				'Maintain at most &lt;n&gt; automatic connections to peers. 11 slots of these are reserved for outgoing connections. See <a href="#inboundrelaypercent">inboundrelaypercent</a> for more information about limits applied to transaction relay inbound peers. This limit does not apply to connections manually added via <a href="#addnode">addnode</a> or the addnode RPC, which have a separate limit of 8. It does not apply to short-lived private broadcast connections either, which have a separate limit of 64',
			defaultValue: '200',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		txsendrate: {
			type: EditorValueType.NUMBER,
			typeConstraints: {
				wholeNumber: true,
			},
			title: 'Transaction Send Rate',
			description:
				'Set the maximum ongoing rate in tx/s for sending transactions to (inbound) peers',
			shortDescription: 'Max ongoing rate in tx/s for sending txs to (inbound) peers',
			defaultValue: '14',
		},
	}))

	patchCategoryOptions(categories, 'RPC', (options) => ({
		...options,

		rpcmaxconnections: {
			type: EditorValueType.NUMBER,
			typeConstraints: {
				wholeNumber: true,
			},
			title: 'Max RPC Connections',
			description: 'The maximum number of connected HTTP clients',
			defaultValue: '16',
		},
	}))

	patchCategoryOptions(categories, 'Wallet', (options) => ({
		...options,

		walletrbf: {
			...options.walletrbf,
			description: '(DEPRECATED) Send transactions with full-RBF opt-in enabled',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => {
		const debugOptions = [...options.debug.options!]
		const debugExcludeOptions = [...options.debugexclude.options!]

		let insertionIdx = debugOptions.findIndex(({ value }) => value === 'mempoolrej') + 1
		debugOptions.splice(insertionIdx, 0, { value: 'mining', label: 'Mining' })
		let deletionIndex = debugOptions.findIndex(({ value }) => value === 'libevent')
		debugOptions.splice(deletionIndex, 1)

		insertionIdx = debugExcludeOptions.findIndex(({ value }) => value === 'mempoolrej') + 1
		debugExcludeOptions.splice(insertionIdx, 0, { value: 'mining', label: 'Mining' })
		deletionIndex = debugExcludeOptions.findIndex(({ value }) => value === 'libevent')
		debugExcludeOptions.splice(deletionIndex, 1)

		return {
			...options,

			debug: {
				...options.debug,
				options: debugOptions,
			},

			debugexclude: {
				...options.debugexclude,
				options: debugExcludeOptions,
			},

			loglevel: {
				...options.loglevel,
				description:
					'Set the global or per-category severity level for logging categories enabled with the <a href="#debug">debug</a> configuration option or the logging RPC.<br><br> Possible values are:<br>info, debug, trace.<br><br>The following levels are always logged:<br>error, warning, info.<br><br>If &lt;category&gt;:&lt;level&gt; is supplied, the setting will override the global one and may be specified multiple times to set multiple category-specific levels.<br><br>&lt;category&gt; can be:<br>addrman, bench, blockstorage, cmpctblock, coindb, estimatefee, http, i2p, ipc, kernel, leveldb, mempool, mempoolrej, mining, net, privatebroadcast, proxy, prune, qt, rand, reindex, rpc, scan, selectcoins, tor, txpackages, txreconciliation, validation, walletdb, zmq',
			},

			shrinkdebugfile: {
				...options.shrinkdebugfile,
				description:
					'Shrink debug log.file on client startup (default: 1 when no <a href="#debug">debug</a>)',
				shortDescription: 'Shrink debug.log file on client startup',
			},

			testactivationheight: {
				...options.testactivationheight,
				description:
					'Set the activation height &lt;name&gt;@&lt;height&gt;<br><br>&lt;name&gt; can be:<br>segwit, bip34, dersig, cltv, csv<br><br>(test-only)',
			},
		}
	})

	return categories
}
