import { EditorValueType } from '@/enums'
import generateConfigCoreV29_0 from '@/configs/core/29.0'
import type { CategoryDefinition } from '@/types/config-definition'

export default function () {
	const categories = generateConfigCoreV29_0()

	const categoryIndex = (title: string) => categories.findIndex((c) => c.title === title)

	const sortConfigDefinitions = (config: CategoryDefinition['configs']) =>
		Object.entries(config)
			.sort(([key1], [key2]) => key1.localeCompare(key2))
			.reduce(
				(result, [key, value]) => {
					result[key] = value
					return result
				},
				{} as CategoryDefinition['configs'],
			)

	const generalCategoryIndex = categoryIndex('General')
	const chainCategoryIndex = categoryIndex('Chain Selection')
	const networkingCategoryIndex = categoryIndex('Networking')
	const mempoolCategoryIndex = categoryIndex('Mempool')
	const miningCategoryIndex = categoryIndex('Mining')
	const rpcCategoryIndex = categoryIndex('RPC')
	const walletCategoryIndex = categoryIndex('Wallet')
	const zeroMQCategoryIndex = categoryIndex('ZeroMQ')
	const debugCategoryIndex = categoryIndex('Debugging & Testing')
	const generalCategory = categories[generalCategoryIndex]
	const chainCategory = categories[chainCategoryIndex]
	const networkingCategory = categories[networkingCategoryIndex]
	const mempoolCategory = categories[mempoolCategoryIndex]
	const miningCategory = categories[miningCategoryIndex]
	const rpcCategory = categories[rpcCategoryIndex]
	const walletCategory = categories[walletCategoryIndex]
	const zeroMQCategory = categories[zeroMQCategoryIndex]
	const debugCategory = categories[debugCategoryIndex]

	categories[generalCategoryIndex] = {
		...generalCategory,

		configs: sortConfigDefinitions({
			...generalCategory.configs,

			assumevalid: {
				...generalCategory.configs.assumevalid,
				defaultValue: {
					mainnet: '000000000000000000006e926737e6a349f7581525ad36e743dfe5f4bc3abbb7',
					testnet3: '000000000000000465b1a66c9f386308e8c75acef9201f3f577811da09fc90ad',
					testnet4: '000000005be348057db991fa5d89fe7c4695b667cfb311391a8db374b6f681fd',
					signet: '0000014aad1d58dddcb964dd749b073374c6306e716b22f573a2efe68d414539',
				},
			},

			blockfilterindex: {
				...generalCategory.configs.blockfilterindex,
				description:
					'Maintain an index of compact filters by block. If set to 1, certain indexes are enabled (currently just basic)',
			},

			confrw: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				title: 'Read/Write Config File',
				description:
					'Specify path to read/write configuration file. Relative paths will be prefixed by the network-specific <a href="#datadir">datadir</a> location',
				shortDescription: 'Specify read/write configuration file',
				defaultValue: 'bitcoin_rw.conf',
			},

			corepolicy: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Core Policy',
				description: 'Use Bitcoin Core policy defaults',
				defaultValue: '0',
			},

			dbbatchsize: {
				...generalCategory.configs.dbbatchsize,
				defaultValue: '67108864',
			},

			dbcache: {
				...generalCategory.configs.dbcache,
				typeConstraints: {
					...generalCategory.configs.dbcache.typeConstraints,
					max: 1048576,
				},
				description:
					'Maximum database cache size in MiB. In addition, unused mempool memory is shared for this cache (see <a href="#maxmempool">maxmempool</a>)',
			},

			dbfilesize: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 1,
					max: 1024,
				},
				title: 'DB File Size',
				description: 'Target size of files within databases, in MiB',
				defaultValue: '64',
			},

			lowmem: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
				},
				title: 'Low Memory',
				description:
					'If system available memory falls below &lt;n&gt; MiB, flush caches (0 to disable)',
				shortDescription: 'If system available memory falls below <n> MiB, flush caches',
				defaultValue: '10',
			},

			minimumchainwork: {
				...generalCategory.configs.minimumchainwork,
				defaultValue: {
					mainnet: '0000000000000000000000000000000000000000b08ea5865bede3101629fa0e',
					testnet3: '000000000000000000000000000000000000000000000f209695166be8b61fa9',
					testnet4: '00000000000000000000000000000000000000000000005faa15d02e6202f3ba',
					signet: '0000000000000000000000000000000000000000000000000000025dbd66e58f',
				},
			},

			pruneduringinit: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: -1,
					invalidRange: [2, 550],
				},
				title: 'Prune Blocks During Init',
				description:
					'Temporarily adjust the <a href="#prune">prune</a> setting until initial sync completes. Ignored if pruning is disabled. (-1 = same value as <a href="#prune">prune</a>)',
				shortDescription: 'Temporarily adjust the -prune setting until initial sync completes',
				defaultValue: '-1',
			},

			softwareexpiry: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Software Expiry',
				description: 'Stop working after this POSIX timestamp. (0 = disable)',
				shortDescription: 'Stop working after this POSIX timestamp',
				defaultValue: '1825593420',
			},
		}),
	}

	categories[chainCategoryIndex] = {
		...chainCategory,

		configs: sortConfigDefinitions({
			...chainCategory.configs,

			signetblocktime: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Signet Blocktime',
				description:
					'Difficulty adjustment will target a block time of the given amount in seconds (only for custom signet networks, must have <a href="#signetchallenge">signetchallenge</a> set',
				shortDescription: 'Difficulty adjustment will target block time of given amount in secs',
				defaultValue: '600',
			},
		}),
	}

	categories[networkingCategoryIndex] = {
		...networkingCategory,

		configs: sortConfigDefinitions({
			...networkingCategory.configs,

			feefilter: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Fee Filter',
				description: 'Tell other nodes to filter invs to us by our mempool min fee',
				defaultValue: '1',
			},

			natpmp: {
				...networkingCategory.configs.natpmp,
				description: 'Use NAT-PMP to map the listening port',
			},

			peerbloomfilters: {
				...networkingCategory.configs.peerbloomfilters,
				defaultValue: '1',
			},

			uaappend: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				title: 'User Agent Append',
				description:
					'Append literal to the user agent string (should only be used for software embedding)',
				shortDescription: 'Append literal to the user agent string',
			},

			upnp: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Transaction Reconciliation',
				description: 'Use UPnP to map the listening port',
				defaultValue: '0',
			},

			v2onlyclearnet: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'v2 Only Clearnet',
				description:
					'Disallow outbound v1 connections on IPV4/IPV6. Enable this option only if you really need it. Use <a href="#listen">listen</a>=0 to disable inbound connections since they can be unencrypted',
				shortDescription: 'Disallow outbound v1 connections on IPV4/IPV6',
				defaultValue: '0',
			},

			whitebind: {
				...networkingCategory.configs.whitebind,
				description:
					'Bind to the given address and add permission flags &lt;[permissions@]addr&gt; to the peers connecting to it. Use [host]:port notation for IPv6. Allowed permissions:<br><br><dl><dt>bloomfilter</dt><dd>allow requesting BIP37 filtered blocks and transactions</dd><br><dt>blockfilters</dt><dd>serve compact block filters to peers per BIP157</dd><br><dt>noban</dt><dd>do not ban for misbehavior; implies download</dd><br><dt>forcerelay</dt><dd>relay transactions that are already in the mempool; implies relay</dd><br><dt>relay</dt><dd>relay even in <a href="#blocksonly">blocksonly</a> mode, and unlimited transaction announcements</dd><br><dt>mempool</dt><dd>allow requesting BIP35 mempool contents</dd><br><dt>download</dt><dd>allow getheaders during IBD, no disconnect after maxuploadtarget limit</dd><br><dt>addr</dt><dd>responses to GETADDR avoid hitting the cache and contain random records with the most up-to-date info</dd><br><dt>forceinbound</dt><dd>when connections are full, attempt to evict a random unprotected inbound peer to open a slot; implies noban</dd></dl><br>Specify multiple permissions separated by commas (default: download,noban,mempool,relay). Can be specified multiple times',
			},

			whitelist: {
				...networkingCategory.configs.whitelist,
				description:
					'Add permission flags &lt;[permissions@]IP address or network&gt; to the peers using the given IP address (e.g. 1.2.3.4) or CIDR-notated network (e.g. 1.2.3.0/24). Uses the same permissions as <a href="#whitebind">whitebind</a>. Additional flags "in" and "out" control whether permissions apply to incoming connections and/or outgoing (default: incoming only). Can be specified multiple times',
			},
		}),
	}

	categories[mempoolCategoryIndex] = {
		...mempoolCategory,

		configs: sortConfigDefinitions({
			...mempoolCategory.configs,

			acceptnonstddatacarrier: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Accept Non-Standard Datacarrier Transactions',
				description: 'Relay and mine non-OP_RETURN datacarrier injection',
				defaultValue: '0',
			},

			acceptnonstdtxn: {
				...mempoolCategory.configs.acceptnonstdtxn,
				description: 'Relay and mine "non-standard" transactions',
			},

			bytespersigopstrict: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Bytes Per Signature Operation Strict',
				description: 'Minimum bytes per sigop in transactions we relay and mine',
				defaultValue: '20',
			},

			datacarriercost: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0.25,
					step: 0.25,
				},
				title: 'Data Carrier Cost',
				description: 'Treat extra data in transactions as at least n vbytes per actual byte',
				defaultValue: '1',
			},

			datacarrierfullcount: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Data Carrier Full Count',
				description: 'Apply datacarriersize limit to all known datacarrier methods',
				defaultValue: '1',
			},

			datacarriersize: {
				...mempoolCategory.configs.datacarriersize,
				description:
					'Maximum size of data in data carrier transactions we relay and mine, in bytes',
				defaultValue: '42',
			},

			dustdynamic: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				title: 'Dynamic Dust Relay Fee',
				description:
					'Automatically raise <a href="#dustrelayfee">dustrelayfee</a> based on either the expected fee to be mined within &lt;blocks&gt; blocks, or to be within the best &lt;kvB&gt; kvB of this node\'s mempool. Specify in format: off|[&lt;multiplier&gt;*]target:&lt;blocks&gt;|[&lt;multiplier&gt;*]mempool:&lt;kvB&gt;. If unspecified, multiplier is 3',
				shortDescription: 'Automatically raise dustrelayfee',
				defaultValue: 'off',
			},

			maxscriptsize: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Maximum Script Size',
				description: 'Maximum size of scripts we relay and mine, in bytes',
				defaultValue: '1650',
			},
			mempoolfullrbf: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Mempool Full RBF',
				description: 'Accept transaction replace-by-fee without requiring replaceability signaling',
				defaultValue: '1',
			},

			mempoolreplacement: {
				knotsExclusive: true,
				type: EditorValueType.SELECT,
				title: 'Mempool Replacement',
				description:
					'Mempool RBF policy. Set "fee,optin" to honour RBF opt-out  signal, or "fee,-optin" to always RBF aka full RBF',
				shortDescription: 'Mempool RBF policy',
				options: [
					{ value: '0', label: 'Disable' },
					{ value: 'fee,optin', label: 'Honor opt-out' },
					{ value: 'fee,-optin', label: 'Full RBF' },
				],
				defaultValue: 'fee,-optin',
			},

			mempooltruc: {
				knotsExclusive: true,
				type: EditorValueType.SELECT,
				title: 'Mempool Topologically Restricted Until Confirmation (TRUC) Policy',
				description:
					'Behaviour for transactions requesting TRUC limits: "reject" the transactions entirely, "accept" them just like any other, or "enforce" to impose their requested restrictions',
				shortDescription: 'Behaviour for transactions requesting TRUC limits',
				options: [
					{ value: 'reject', label: 'Reject' },
					{ value: 'accept', label: 'Accept' },
					{ value: 'enforce', label: 'Enforce' },
				],
				defaultValue: 'accept',
			},

			permitbaremultisig: {
				...mempoolCategory.configs.permitbaremultisig,
				defaultValue: '0',
			},

			permitbarepubkey: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Permit Bare Pubkey',
				description: 'Relay legacy pubkey outputs',
				defaultValue: '0',
			},

			rejectparasites: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Reject Parasites',
				description: 'Refuse to relay or mine parasitic overlay protocols',
				defaultValue: '1',
			},

			rejecttokens: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Reject Tokens',
				description: 'Refuse to relay or mine transactions involving non-bitcoin tokens',
				defaultValue: '0',
			},

			spkreuse: {
				knotsExclusive: true,
				type: EditorValueType.SELECT,
				title: 'Script And Public Key Reuse',
				description:
					'Set to "allow" to relay/mine transactions reusing addresses or other pubkey scripts, or "conflict" to treat them as exclusive prior to being mined',
				shortDescription: 'Whether to relay/mine txs reusing addresses or other pubkey scripts',
				options: [
					{ value: 'allow', label: 'Allow' },
					{ value: 'conflict', label: 'Disallow' },
				],
				defaultValue: 'allow',
			},
		}),
	}

	delete miningCategory.configs.blockreservedweight

	categories[miningCategoryIndex] = {
		...miningCategory,

		configs: sortConfigDefinitions({
			...miningCategory.configs,

			blockmaxsize: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Max Block Size',
				description: 'Set maximum block size in bytes',
				defaultValue: '300000',
			},

			blockmaxweight: {
				...miningCategory.configs.blockmaxweight,
				defaultValue: '1200000',
			},

			blockprioritysize: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Block Priority Size',
				description: 'Set maximum size of high-priority/low-fee transactions in bytes',
				defaultValue: '100000',
			},
		}),
	}

	categories[rpcCategoryIndex] = {
		...rpcCategory,

		configs: sortConfigDefinitions({
			...rpcCategory.configs,

			rpcauth: {
				...rpcCategory.configs.rpcauth,
				description:
					"Username and HMAC-SHA-256 hashed password for JSON-RPC connections, to be provided in the format: &lt;userpw&gt;[:wallet]. The field &lt;userpw&gt; comes in the format: &lt;USERNAME&gt;:&lt;SALT&gt;$&lt;HASH&gt;. A canonical python script is included in share/rpcauth. The client then connects normally using the rpcuser=&lt;USERNAME&gt;/rpcpassword=&lt;PASSWORD&gt; pair of arguments. A single wallet name can also be specified to restrict access to only that wallet, or '-' to deny all wallet access. This option can be specified multiple times",
			},

			rpcauthfile: {
				knotsExclusive: true,
				type: EditorValueType.MULTI_TEXT,
				title: 'RPC Authentication File',
				description:
					'A file with a single line with the same format as <a href="#rpcauth">rpcauth</a>. This option can be specified multiple times',
				shortDescription: 'A file with a single line with the same format as rpcauth',
			},

			rpcworkqueue: {
				...rpcCategory.configs.rpcworkqueue,
				description: 'The depth of the work queue to service RPC calls',
			},
		}),
	}

	categories[walletCategoryIndex] = {
		...walletCategory,

		configs: sortConfigDefinitions({
			...walletCategory.configs,

			txconfirmtarget: {
				...walletCategory.configs.txconfirmtarget,
				defaultValue: '144',
			},

			walletimplicitsegwit: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Wallet Implicit Segwit',
				description: 'Support segwit when restoring wallet backups and importing keys',
				defaultValue: '0',
			},

			walletnotify: {
				...walletCategory.configs.walletnotify,
				description:
					"Execute command when a wallet transaction changes. %s in cmd is replaced by TxID, %w is replaced by wallet name, %b is replaced by the hash of the block including the transaction (set to 'unconfirmed' if the transaction is not included) and %h is replaced by the block height (-1 if not included). %w should NOT be quoted because this would break shell escaping used to invoke the command",
			},
		}),
	}

	categories[zeroMQCategoryIndex] = {
		...zeroMQCategory,

		configs: sortConfigDefinitions({
			...zeroMQCategory.configs,

			zmqpubhashwallettx: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				typeConstraints: {
					base58: true,
				},
				title: 'Publish Wallet Transaction Hashes',
				description: 'Enable publishing of wallet transaction hashes to &lt;address&gt;',
				shortDescription: 'Enable publishing of wallet transaction hashes to <address>',
			},

			zmqpubhashwallettxhwm: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Publish Wallet Transaction Hashes High Water Mark',
				description: 'Set publish hash wallet transaction outbound message high water mark',
				defaultValue: '1000',
			},

			zmqpubrawwallettx: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				typeConstraints: {
					base58: true,
				},
				title: 'Publish Raw Wallet Transaction',
				description: 'Enable publishing of raw wallet transaction hex to &lt;address&gt;',
				shortDescription: 'Enable publishing of raw wallet transaction hex to <address>',
			},

			zmqpubrawwallettxhwm: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Publish Raw Wallet Transactions High Water Mark',
				description: 'Set publish raw wallet transaction outbound message high water mark',
				defaultValue: '1000',
			},
		}),
	}

	categories[debugCategoryIndex] = {
		...debugCategory,

		configs: sortConfigDefinitions({
			...debugCategory.configs,

			checkpoints: {
				...debugCategory.configs.checkpoints,
				description:
					'Enable rejection of any forks from the known historical chain until block 885248',
				shortDescription: 'Reject forks from the known historical chain until block 885248',
			},

			printpriority: {
				...debugCategory.configs.printpriority,
				description: 'Log transaction priority and fee rate in BTC/kvB when mining blocks',
			},

			test: {
				...debugCategory.configs.test,
				options: [{ value: 'addrman', label: 'Deterministic addrman' }],
			},
		}),
	}

	categories.splice(debugCategoryIndex, 0, {
		knotsExclusive: true,
		title: 'Statistics',
		description: 'Options for collecting statistics',
		configs: {
			statsenable: {
				knotsExclusive: true,
				type: EditorValueType.CHECKBOX,
				title: 'Enable statistics',
				description: 'Enable statistics',
				defaultValue: '0',
			},
			statsmaxmemorytarget: {
				knotsExclusive: true,
				type: EditorValueType.NUMBER,
				typeConstraints: {
					min: 0,
					wholeNumber: true,
				},
				title: 'Statistics Maximum Memory Target',
				description: 'Set the memory limit target for statistics in bytes',
				defaultValue: '10485760',
			},
		},
	})

	return categories
}
