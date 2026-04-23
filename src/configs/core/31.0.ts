import generateConfigCoreV30_2 from '@/configs/core/30.2'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigCoreV30_2()

	patchCategoryOptions(categories, 'General', (options) => {
		return {
			...options,

			assumevalid: {
				...options.assumevalid,
				defaultValue: {
					mainnet: '00000000000000000000ccebd6d74d9194d8dcdc1d177c478e094bfad51ba5ac',
					testnet3: '000000007a61e4230b28ac5cb6b5e5a0130de37ac1faf2f8987d2fa6505b67f4',
					testnet4: '0000000002368b1e4ee27e2e85676ae6f9f9e69579b29093e9a82c170bf7cf8a',
					signet: '00000008414aab61092ef93f1aacc54cf9e9f16af29ddad493b908a01ff5c329',
				},
			},

			dbbatchsize: {
				...options.dbbatchsize,
				defaultValue: '33554432',
			},

			dbcache: {
				...options.dbcache,
				defaultValue: '1024',
			},

			minimumchainwork: {
				...options.minimumchainwork,
				defaultValue: {
					mainnet: '0000000000000000000000000000000000000001128750f82f4c366153a3a030',
					testnet3: '0000000000000000000000000000000000000000000017dde1c649f3708d14b6',
					testnet4: '0000000000000000000000000000000000000000000009a0fe15d0177d086304',
					signet: '00000000000000000000000000000000000000000000000000000b463ea0a4b8',
				},
			},

			txospenderindex: {
				type: EditorValueType.CHECKBOX,
				title: 'Transaction Output Spender Index',
				description:
					'Maintain a transaction output spender index, used by the gettxspendingprevout rpc call',
				shortDescription: 'Maintain tx output spender index, used by gettxspendingprevout rpc call',
				defaultValue: '0',
			},
		}
	})

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		asmap: {
			...options.asmap,
			description:
				'Specify asn mapping file used for bucketing of the peers. Relative paths will be prefixed by the net-specific <a href="#datadir">datadir</a> location. If set to 1, the embedded mapping data in the binary will be used',
		},

		maxconnections: {
			...options.maxconnections,
			description:
				'Maintain at most &lt;n&gt; automatic connections to peers. This limit does not apply to connections manually added via <a href="#addnode">addnode</a> or the addnode RPC, which have a separate limit of 8. It does not apply to short-lived private broadcast connections either, which have a separate limit of 64',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		privatebroadcast: {
			type: EditorValueType.CHECKBOX,
			title: 'Private Broadcast',
			description:
				'Broadcast transactions submitted via sendrawtransaction RPC using short-lived connections through the Tor or I2P networks, without putting them in the mempool first. Transactions submitted through the wallet are not affected by this option',
			shortDescription: 'Broadcast txs submitted via sendrawtransaction RPC through Tor/I2P',
			defaultValue: '0',
		},
	}))

	patchCategoryOptions(categories, 'Mining', (options) => ({
		...options,

		blockreservedweight: {
			...options.blockreservedweight,
			description:
				'Reserve space for the fixed-size block header plus the largest coinbase transaction the mining software may add to the block. Only affects mining RPC clients, not IPC clients',
		},
	}))

	patchCategoryOptions(categories, 'Wallet', (options) => {
		delete options.paytxfee

		return {
			...options,

			txconfirmtarget: {
				...options.txconfirmtarget,
				description:
					'Include enough fee so that transactions begin confirmation on average within &lt;n&gt; blocks',
				shortDescription: 'Add fee so txs begin confirmation on avg within <n> blocks',
			},
		}
	})

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => {
		const debugOptions = [...options.debug.options!]
		const debugExcludeOptions = [...options.debugexclude.options!]

		let insertionIdx = debugOptions.findIndex(({ value }) => value === 'ipc') + 1
		debugOptions.splice(insertionIdx, 0, { value: 'kernel', label: 'Kernel' })
		insertionIdx = debugOptions.findIndex(({ value }) => value === 'net') + 1
		debugOptions.splice(insertionIdx, 0, { value: 'privatebroadcast', label: 'Private broadcast' })

		insertionIdx = debugExcludeOptions.findIndex(({ value }) => value === 'ipc') + 1
		debugExcludeOptions.splice(insertionIdx, 0, { value: 'kernel', label: 'Kernel' })
		insertionIdx = debugExcludeOptions.findIndex(({ value }) => value === 'net') + 1
		debugExcludeOptions.splice(insertionIdx, 0, {
			value: 'privatebroadcast',
			label: 'Private broadcast',
		})

		delete options.limitancestorsize
		delete options.limitdescendantsize

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

			limitancestorcount: {
				...options.limitancestorcount,
				description:
					'(DEPRECATED) Do not accept transactions if number of in-mempool ancestors is &lt;n&gt; or more. Replaced by cluster limits (see <a href="#limitclustercount">limitclustercount</a>) and only used by wallet for coin selection',
			},

			limitclustercount: {
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					max: 64,
					wholeNumber: true,
				},
				title: 'Limit Cluster Count',
				description:
					'Do not accept transactions into mempool which are directly or indirectly connected to &lt;n&gt; or more other unconfirmed transactions',
				shortDescription: "Don't accept txs connected to <n> or more other unconfirmed txs",
				defaultValue: '64',
			},

			limitclustersize: {
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Limit Cluster Size',
				description:
					'Do not accept transactions into mempool whose virtual size with all in-mempool connected transactions exceeds &lt;n&gt; kilobytes',
				shortDescription:
					"Don't accept txs whose virtual size with all in-mempool connected txs exceeds <n> kB",
				defaultValue: '101',
			},

			limitdescendantcount: {
				...options.limitdescendantcount,
				description:
					'(DEPRECATED) Do not accept transactions if any ancestor would have &lt;n&gt; or more in-mempool descendants. Replaced by cluster limits (see <a href="#limitclustercount">limitclustercount</a>) and only used by wallet for coin selection',
			},

			logips: {
				...options.logips,
				description: 'Include IP addresses in log output',
			},

			loglevel: {
				...options.loglevel,
				description:
					'Set the global or per-category severity level for logging categories enabled with the <a href="#debug">debug</a> configuration option or the logging RPC.<br><br> Possible values are:<br>info, debug, trace.<br><br>The following levels are always logged:<br>error, warning, info.<br><br>If &lt;category&gt;:&lt;level&gt; is supplied, the setting will override the global one and may be specified multiple times to set multiple category-specific levels.<br><br>&lt;category&gt; can be:<br>addrman, bench, blockstorage, cmpctblock, coindb, estimatefee, http, i2p, ipc, kernel, leveldb, libevent, mempool, mempoolrej, net, privatebroadcast, proxy, prune, qt, rand, reindex, rpc, scan, selectcoins, tor, txpackages, txreconciliation, validation, walletdb, zmq',
			},

			stopatheight: {
				...options.stopatheight,
				description:
					'Stop running after reaching the given height in the main chain (0 = disable). Blocks after target height may be processed during shutdown',
				shortDescription:
					'Stop running after reaching the given height in the main chain (0 = disable)',
			},
		}
	})

	return categories
}
