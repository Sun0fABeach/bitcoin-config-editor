import generateConfigKnotsV28_1 from '@/configs/knots/28.1'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigKnotsV28_1()

	patchCategoryOptions(categories, 'General', (options) => ({
		...options,

		assumevalid: {
			...options.assumevalid,
			defaultValue: {
				mainnet: '00000000000000000000611fd22f2df7c8fbd0688745c3a6c3bb5109cc2a12cb',
				testnet3: '00000000000003fc7967410ba2d0a8a8d50daedc318d43e8baf1a9782c236a57',
				testnet4: '0000000000003ed4f08dbdf6f7d6b271a6bcffce25675cb40aa9fa43179a89f3',
				signet: '000000895a110f46e59eb82bbc5bfb67fa314656009c295509c21b4999f5180a',
			},
		},

		blockreconstructionextratxn: {
			...options.blockreconstructionextratxn,
			defaultValue: '32768',
		},

		blockreconstructionextratxnsize: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
			},
			title: 'Block Reconstruction Transactions Size',
			description:
				'Upper limit of memory usage (in megabytes) for keeping extra transactions in memory for compact block reconstructions',
			shortDescription:
				'Max memory (in MiB) for storing extra txs for compact block reconstructions',
			defaultValue: '10',
		},

		dbcache: {
			...options.dbcache,
			description:
				'Maximum database cache size in MiB. Make sure you have enough RAM. In addition, unused memory allocated to the mempool is shared with this cache (see <a href="#maxmempool">maxmempool</a>)',
		},

		lowmem: {
			...options.lowmem,
			defaultValue: '64',
		},

		minimumchainwork: {
			...options.minimumchainwork,
			defaultValue: {
				mainnet: '0000000000000000000000000000000000000000dee8e2a309ad8a9820433c68',
				testnet3: '0000000000000000000000000000000000000000000015f5e0c9f13455b0eb17',
				testnet4: '0000000000000000000000000000000000000000000001d6dce8651b6094e4c1',
				signet: '000000000000000000000000000000000000000000000000000002b517f3d1a1',
			},
		},
	}))

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		natpmp: {
			...options.natpmp,
			description: 'Use PCP or NAT-PMP to map the listening port',
			defaultValue: '1',
		},

		peerbloomfilters: {
			...options.peerbloomfilters,
			defaultValue: 'localhost only',
		},

		proxy: {
			...options.proxy,
			description:
				'Connect through &lt;ip&gt;[:&lt;port&gt;]|unix:&lt;path&gt;[=&lt;network&gt;] SOCKS5 proxy, set <a href="#noproxy">noproxy</a> to disable. May be a local file path prefixed with \'unix:\' if the proxy supports it. Could end in =network to set the proxy only for that network. The network can be any of ipv4, ipv6, tor or cjdns',
			shortDescription: 'Connect through <ip>[:<port>]|unix:<path>[=<network>] SOCKS5 proxy',
		},

		torexecute: {
			knotsExclusive: true,
			type: EditorValueType.TEXT,
			title: 'Tor Command',
			description: 'Tor command to use if not already running',
			defaultValue: 'tor',
		},

		uacomment: {
			type: EditorValueType.TEXT,
			title: 'User Agent Comment',
			description: 'Append comment to the user agent string',
		},

		uaspoof: {
			knotsExclusive: true,
			type: EditorValueType.TEXT,
			title: 'User Agent Spoofing',
			description:
				"Replace entire user agent string with custom identifier (should be formatted '/Name:Version/Name:Version/.../' as specified in BIP 14)",
			shortDescription: 'Replace entire user agent string with custom identifier',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		acceptunknownwitness: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Accept Unknown Witness Script Versions',
			description: 'Relay txs sending to unknown/future witness script versions',
			defaultValue: '1',
		},

		maxscriptsize: {
			...options.maxscriptsize,
			description:
				'Maximum size of scripts (including the entire witness stack) we relay and mine, in bytes',
		},

		maxtxlegacysigops: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				wholeNumber: true,
			},
			title: 'Maximum Legacy Sigops',
			description:
				'Maximum number of legacy sigops allowed in transactions we relay and mine, as measured by BIP54',
			shortDescription: 'Maximum number of legacy sigops allowed in transactions we relay and mine',
			defaultValue: '2500',
		},

		minrelaycoinblocks: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
			},
			title: 'Minimum Coins Per Block',
			description:
				'Minimum "coin blocks" (measured in sats per block) that a transaction must be spending to be relayed',
			shortDescription: 'Sats per block that a tx must be spending to be relayed',
			defaultValue: '0',
		},

		minrelaymaturity: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				wholeNumber: true,
			},
			title: 'Minimum Maturity',
			description:
				'Minimum number of blocks that inputs must mature before being spent in transactions we relay',
			shortDescription: 'Number of blocks inputs must mature before being spent in txs we relay',
			defaultValue: '0',
		},

		permitbareanchor: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Permit Bare Anchor',
			description: 'Relay transactions that only have ephemeral anchor outputs',
			defaultValue: '1',
		},

		permitbaredatacarrier: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Permit Bare Datacarrier',
			description: 'Relay transactions that only have data carrier outputs',
			defaultValue: '0',
		},

		permitephemeral: {
			knotsExclusive: true,
			type: EditorValueType.TEXT,
			title: 'Permit Ephemeral Outputs',
			description:
				"Relay transaction packages that include ephemeral outputs defined by comma-separated options (prefix each by '-' to force off):<br><br><dl><dt>anchor</dt><dd>allow minimal anyone-can-spend anchors</dd><br><dt>send</dt><dd>allow ordinary output types to be considered ephemeral</dd><br><dt>dust</dt><dd>allow for dust-amount outputs rather than strictly zero-value</dd></dl>",
			shortDescription: 'Relay transaction packages that include ephemeral outputs',
			defaultValue: 'anchor,-send,-dust',
		},
	}))

	patchCategoryOptions(categories, 'Mining', (options) => ({
		...options,

		blockreservedweight: {
			type: EditorValueType.NUMBER,
			typeConstraints: {
				min: 0,
				wholeNumber: true,
			},
			title: 'Block Reserved Weight',
			description:
				'Reserve space for the fixed-size block header plus the largest coinbase transaction the mining software may add to the block',
			shortDescription: 'Reserve space the mining software may add to the block',
			defaultValue: '8000',
		},
	}))

	patchCategoryOptions(categories, 'RPC', (options) => ({
		...options,

		rpcallowip: {
			...options.rpcallowip,
			description:
				'Allow JSON-RPC connections from specified source. Valid are a single IP (e.g. 1.2.3.4), a network/netmask (e.g. 1.2.3.4/255.255.255.0) a network/CIDR (e.g. 1.2.3.4/24), all ipv4 (0.0.0.0/0), or all ipv6 (::/0). RFC4193 is allowed only if <a href="#cjdnsreachable">cjdnsreachable</a>=0. This option can be specified multiple times',
		},

		rpcworkqueue: {
			...options.rpcworkqueue,
			description: 'Maximum depth of the work queue to service RPC calls',
		},
	}))

	patchCategoryOptions(categories, 'Wallet', (options) => ({
		...options,

		walletnotify: {
			...options.walletnotify,
			description:
				"Execute command when a wallet transaction changes. %s in cmd is replaced by TxID, %w is replaced by wallet name, %b is replaced by the hash of the block including the transaction (set to 'unconfirmed' if the transaction is not included) and %h is replaced by the block height (-1 if not included). %w is not currently implemented on windows. On systems where %w is supported, it should NOT be quoted because this would break shell escaping used to invoke the command",
		},
	}))

	patchCategoryOptions(categories, 'Statistics', (options) => ({
		...options,

		statsenable: {
			...options.statsenable,
			description: 'Enable statistics (default: 1 for GUI, 0 otherwise)',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => {
		delete options.uacomment // moved to networking category

		return {
			...options,

			checkpoints: {
				...options.checkpoints,
				description:
					'Enable rejection of any forks from the known historical chain until block 908765',
				shortDescription: 'Reject forks from the known historical chain until block 908765',
			},

			logratelimit: {
				type: EditorValueType.CHECKBOX,
				title: 'Log Rate Limit',
				description:
					'Apply rate limiting to unconditional logging to mitigate disk-filling attacks',
				defaultValue: '1',
			},

			test: {
				...options.test,
				options: [
					{ value: 'addrman', label: 'Deterministic addrman' },
					{ value: 'reindex_after_failure_noninteractive_yes', label: 'Reindex after failure' },
					{ value: 'bip94', label: 'BIP94 consensus rules' },
				],
			},
		}
	})

	return categories
}
