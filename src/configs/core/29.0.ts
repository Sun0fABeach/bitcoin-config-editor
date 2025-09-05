import { EditorValueType } from '@/enums'
import type { CategoryDefinition } from '@/types/config-definition'

export default () =>
	[
		{
			title: 'General',
			description: 'Basic parameters regarding node operation',
			configs: {
				alertnotify: {
					type: EditorValueType.TEXT,
					title: 'Alert Notification',
					description: 'Execute command when an alert is raised (%s in cmd is replaced by message)',
					shortDescription: 'Execute command when an alert is raised (%s is replaced by message)',
				},
				allowignoredconf: {
					type: EditorValueType.CHECKBOX,
					title: 'Allow Ignored Config File',
					description:
						'For backwards compatibility, treat an unused bitcoin.conf file in the datadir as a warning, not an error',
					shortDescription: 'Treat unused bitcoin.conf file in the datadir as warning, not error',
					defaultValue: '0',
				},
				assumevalid: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						hex: true,
						minLength: 64,
						maxLength: 64,
					},
					title: 'Assume Valid Chain History',
					description:
						'If this block is in the chain assume that it and its ancestors are valid and potentially skip their script verification (0 to verify all)',
					shortDescription:
						'If this block is in the chain assume that it and its ancestors are valid and potentially skip their script verification',
					defaultValue: {
						mainnet: '00000000000000000001b658dd1120e82e66d2790811f89ede9742ada3ed6d77',
						testnet3: '00000000000003fc7967410ba2d0a8a8d50daedc318d43e8baf1a9782c236a57',
						testnet4: '0000000000003ed4f08dbdf6f7d6b271a6bcffce25675cb40aa9fa43179a89f3',
						signet: '000000895a110f46e59eb82bbc5bfb67fa314656009c295509c21b4999f5180a',
					},
				},
				blockfilterindex: {
					type: EditorValueType.SELECT,
					title: 'Block Filter Index',
					description:
						'Maintain an index of compact filters by block. If set to 1, indexes for all known types are enabled (currently just basic)',
					shortDescription: 'Maintain an index of compact filters by block',
					options: [
						{ value: '0', label: 'Disable' },
						{ value: '1', label: 'Enable' },
						{ value: 'basic', label: 'Basic' },
						{ value: 'v0', label: 'v0' },
					],
					defaultValue: '0',
				},
				blocknotify: {
					type: EditorValueType.TEXT,
					title: 'Block Notification',
					description:
						'Execute command when the best block changes (%s in cmd is replaced by block hash)',
					shortDescription:
						'Execute command when the best block changes (%s is replaced by block hash)',
				},
				blockreconstructionextratxn: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Block Reconstruction Transactions Count',
					description:
						'Number of extra transactions to keep in memory for compact block reconstructions',
					defaultValue: '100',
				},
				blocksdir: {
					type: EditorValueType.TEXT,
					title: 'Block Data Storage Location',
					description: 'Specify directory to hold blocks subdirectory for *.dat files',
					defaultValue: 'value of <a href="#datadir">datadir</a>',
				},
				blocksonly: {
					type: EditorValueType.CHECKBOX,
					title: 'Blocks Only Mode',
					description:
						"Whether to reject unconfirmed transactions from network peers. Disables automatic broadcast and rebroadcast of transactions, unless the source peer has the 'forcerelay' permission. RPC transactions are not affected",
					shortDescription: 'Whether to reject unconfirmed transactions from network peers',
					defaultValue: '0',
				},
				blocksxor: {
					type: EditorValueType.CHECKBOX,
					title: 'Block Data XOR',
					description:
						'Whether an XOR-key applies to <a href="#blocksdir">blocksdir</a> *.dat files. The created XOR-key will be zeros for an existing blocksdir or when 0 is set, and random for a freshly initialized blocksdir',
					shortDescription: 'Whether an XOR-key applies to blocksdir *.dat files',
					defaultValue: '1',
				},
				coinstatsindex: {
					type: EditorValueType.CHECKBOX,
					title: 'Coin Stats Index',
					description: 'Maintain coinstats index used by the gettxoutsetinfo RPC',
					defaultValue: '0',
				},
				daemon: {
					type: EditorValueType.CHECKBOX,
					title: 'Daemon Mode',
					description: 'Run in the background as a daemon and accept commands',
					defaultValue: '0',
				},
				daemonwait: {
					type: EditorValueType.CHECKBOX,
					title: 'Daemon Wait Mode',
					description:
						'Wait for initialization to be finished before exiting. This implies <a href="#daemon">daemon</a> mode',
					shortDescription: 'Wait for initialization to be finished before exiting',
					defaultValue: '0',
				},
				datadir: {
					type: EditorValueType.TEXT,
					title: 'Data Storage Location',
					description: 'Specify data directory',
				},
				dbbatchsize: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'DB Batch Size',
					description: 'Maximum database write batch size in bytes',
					defaultValue: '16777216',
				},
				dbcache: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 4,
					},
					title: 'DB Cache Size',
					description:
						'Maximum database cache size in MiB. Make sure you have enough RAM. In addition, unused memory allocated to the mempool is shared with this cache (see <a href="#maxmempool">maxmempool</a>)',
					shortDescription: 'Maximum database cache size in MiB',
					defaultValue: '450',
				},
				debuglogfile: {
					type: EditorValueType.TEXT,
					title: 'Debug Log File',
					description:
						'Specify location of debug log file. Relative paths will be prefixed by a net-specific <a href="#datadir">datadir</a> location. Use <a href="#nodebuglogfile">nodebuglogfile</a> to disable writing the log to a file',
					shortDescription: 'Specify location of debug log file',
					defaultValue: 'debug.log',
				},
				loadblock: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Import Blocks From File',
					description:
						'Import blocks from external blk000??.dat file on startup. This option can be set multiple times with different file values',
					shortDescription: 'Import blocks from external blk000??.dat file on startup',
				},
				maxmempool: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Mempool Size',
					description: 'Keep the transaction memory pool below &lt;n&gt; megabytes',
					shortDescription: 'Keep the transaction memory pool below <n> megabytes',
					defaultValue: '300',
				},
				maxorphantx: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Max Orphan Transactions',
					description: 'Keep at most &lt;n&gt; unconnectable transactions in memory',
					shortDescription: 'Keep at most <n> unconnectable transactions in memory',
					defaultValue: '100',
				},
				mempoolexpiry: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Mempool Expiration',
					description: 'Do not keep transactions in the mempool longer than &lt;n&gt; hours',
					shortDescription: 'Do not keep transactions in the mempool longer than <n> hours',
					defaultValue: '336',
				},
				minimumchainwork: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						hex: true,
						minLength: 64,
						maxLength: 64,
					},
					title: 'Minimum Chain Work',
					description: 'Minimum work assumed to exist on a valid chain in hex',
					defaultValue: {
						mainnet: '0000000000000000000000000000000000000000b1f3b93b65b16d035a82be84',
						testnet3: '0000000000000000000000000000000000000000000015f5e0c9f13455b0eb17',
						testnet4: '0000000000000000000000000000000000000000000001d6dce8651b6094e4c1',
						signet: '000000000000000000000000000000000000000000000000000002b517f3d1a1',
					},
				},
				nodebuglogfile: {
					type: EditorValueType.CHECKBOX,
					title: 'No Debug Log File',
					description: 'Disable writing the debug log to a file',
					defaultValue: '0',
				},
				nosettings: {
					type: EditorValueType.CHECKBOX,
					title: 'No Settings File',
					description: 'Disable writing the settings file',
					defaultValue: '0',
				},
				par: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						max: 15,
						wholeNumber: true,
					},
					title: 'Script Verification Parallelization',
					description:
						'Set the number of script verification threads (0 = automatic, up to 15, less than 0 = leave that many cores free)',
					shortDescription: 'Set the number of script verification threads',
					defaultValue: '336',
				},
				persistmempool: {
					type: EditorValueType.CHECKBOX,
					title: 'Persist Mempool',
					description: 'Whether to save the mempool on shutdown and load on restart',
					defaultValue: '1',
				},
				persistmempoolv1: {
					type: EditorValueType.CHECKBOX,
					title: 'Persist Mempool v1',
					description:
						'Whether a mempool.dat file created by <a href="#persistmempool">persistmempool</a> or the savemempool RPC will be written in the legacy format (version 1) or the current format (version 2). This temporary option will be removed in the future',
					shortDescription:
						'Whether mempool.dat file created by -persistmempool or the savemempool RPC is written in legacy (v1) or current (v2) format',
					defaultValue: '0',
				},
				pid: {
					type: EditorValueType.TEXT,
					title: 'PID File',
					description:
						'Specify process ID file name. Relative paths will be prefixed by a net-specific <a href="#datadir">datadir</a> location',
					shortDescription: 'Specify process ID file name',
					defaultValue: 'bitcoind.pid',
				},
				prune: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						invalidRange: [2, 550],
					},
					title: 'Prune Blocks',
					description:
						'Reduce storage requirements by enabling pruning (deleting) of old blocks. This allows the pruneblockchain RPC to be called to delete specific blocks and enables automatic pruning of old blocks if a target size in MiB is provided. This mode is incompatible with <a href="#txindex">txindex</a> and <a href="#coinstatsindex">coinstatsindex</a>. WARNING: Reverting this setting requires re-downloading the entire blockchain. (0 = disable pruning blocks, 1 = allow manual pruning via RPC, greater or equal 550 = automatically prune blocks to stay under target size in MiB)',
					shortDescription: 'Enable pruning of old blocks',
					defaultValue: '0',
				},
				reindex: {
					type: EditorValueType.SELECT,
					title: 'Reindex',
					description:
						'If enabled, wipe chain state and block index, and rebuild them from blk*.dat files on disk. Also wipe and rebuild other optional indexes that are active. If an assumeutxo snapshot was loaded, its chainstate will be wiped as well. The snapshot can then be reloaded via RPC. Setting this to auto automatically reindexes the block database if it is corrupted',
					shortDescription:
						'Wipe chain state and block index, and rebuild them from blk*.dat files',
					options: [
						{ value: '0', label: 'Disable' },
						{ value: '1', label: 'Enable' },
						{ value: 'auto', label: 'Auto' },
					],
					defaultValue: '0',
				},
				'reindex-chainstate': {
					type: EditorValueType.CHECKBOX,
					title: 'Reindex Chainstate',
					description:
						'If enabled, wipe chain state, and rebuild it from blk*.dat files on disk. If an assumeutxo snapshot was loaded, its chainstate will be wiped as well. The snapshot can then be reloaded via RPC',
					shortDescription: 'Wipe chain state and rebuild it from blk*.dat files',
					defaultValue: '0',
				},
				settings: {
					type: EditorValueType.TEXT,
					title: 'Settings File',
					description:
						'Specify path to dynamic settings data file. Can be disabled with <a href="#nosettings">nosettings</a>. File is written at runtime and not meant to be edited by users (use bitcoin.conf instead for custom settings). Relative paths will be prefixed by <a href="#datadir">datadir</a> location',
					shortDescription: 'Specify path to dynamic settings data file',
					defaultValue: 'settings.json',
				},
				shutdownnotify: {
					type: EditorValueType.TEXT,
					title: 'Shutdown Notification',
					description:
						"Execute command immediately before beginning shutdown. The need for shutdown may be urgent, so be careful not to delay it long (if the command doesn't require interaction with the server, consider having it fork into the background)",
					shortDescription: 'Execute command immediately before beginning shutdown',
				},
				startupnotify: {
					type: EditorValueType.TEXT,
					title: 'Startup Notification',
					description: 'Execute command on startup',
				},
				txindex: {
					type: EditorValueType.CHECKBOX,
					title: 'Index Transactions',
					description: 'Maintain a full transaction index, used by the getrawtransaction rpc call',
					defaultValue: '0',
				},
			},
		},
		{
			title: 'Chain Selection',
			description: 'Which network / blockchain to use',
			configs: {
				chain: {
					type: EditorValueType.SELECT,
					title: 'Chain',
					description: 'Choose which network / blockchain to use',
					options: [
						{ value: 'main', label: 'Main' },
						{ value: 'test', label: 'Testnet' },
						{ value: 'testnet4', label: 'Testnet 4' },
						{ value: 'signet', label: 'Signet' },
						{ value: 'regtest', label: 'Regtest' },
					],
					defaultValue: 'main',
				},
				regtest: {
					type: EditorValueType.CHECKBOX,
					title: 'Use Regtest',
					description:
						'Enter regression test mode, which uses a special chain in which blocks can be solved instantly. This is intended for regression testing tools and app development. Equivalent to <a href="#chain">chain</a>=regtest',
					shortDescription: 'Enter regression test mode',
					defaultValue: '0',
				},
				signet: {
					type: EditorValueType.CHECKBOX,
					title: 'Use Signet',
					description:
						'Use the signet chain. Equivalent to <a href="#chain">chain</a>=signet. Note that the network is defined by the <a href="#signetchallenge">signetchallenge</a> parameter',
					shortDescription: 'Use the signet chain',
					defaultValue: '0',
				},
				signetchallenge: {
					type: EditorValueType.TEXT,
					title: 'Signet Challenge',
					description:
						'Blocks must satisfy the given script to be considered valid (only for signet networks; defaults to the global default signet test network challenge)',
					shortDescription: 'Blocks must satisfy the given script to be considered valid',
				},
				signetseednode: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Signet Seed Node',
					description:
						'Specify a seed node for the signet network, in the hostname[:port] format, e.g. sig.net:1234 (may be used multiple times to specify multiple seed nodes; defaults to the global default signet test network seed node(s))',
					shortDescription: 'Specify seed node for the signet network',
				},
				testnet: {
					type: EditorValueType.CHECKBOX,
					title: 'Use Testnet',
					description:
						'Use the testnet3 chain. Equivalent to <a href="#chain">chain</a>=test. Support for testnet3 is deprecated and will be removed in an upcoming release. Consider moving to testnet4 now by using <a href="#testnet4">testnet4</a>',
					shortDescription: 'Use the testnet3 chain',
					defaultValue: '0',
				},
				testnet4: {
					type: EditorValueType.CHECKBOX,
					title: 'Use Testnet 4',
					description: 'Use the testnet4 chain. Equivalent to <a href="#chain">chain</a>=testnet4',
					shortDescription: 'Use the testnet4 chain',
					defaultValue: '0',
				},
				vbparams: {
					type: EditorValueType.TEXT,
					title: 'Version Bits Deployment Params',
					description:
						'Use given start/end times for specified version bits deployment. Format: &lt;deployment:start:end[:min_activation_height]&gt;. Can be set multiple times. (regtest-only)',
					shortDescription: 'Use given start/end times for specified version bits deployment',
				},
			},
		},
		{
			title: 'Networking',
			description: 'How your node interacts with other peers on the network',
			configs: {
				addnode: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Connect to Peer',
					description:
						'Add a node IP address to connect to and attempt to keep the connection open. This option can be set multiple times to add multiple nodes. Connections are limited to 8 at a time and are counted separately from the <a href="#maxconnections">maxconnections</a> limit',
					shortDescription:
						'Add a node IP address to connect to and attempt to keep the connection open',
				},
				asmap: {
					type: EditorValueType.TEXT,
					title: 'ASN Mapping',
					description:
						'Specify asn mapping used for bucketing of the peers. Relative paths will be prefixed by the net-specific <a href="#datadir">datadir</a> location',
					shortDescription: 'Specify asn mapping used for bucketing of the peers',
					defaultValue: 'ip_asn.map',
				},
				bantime: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Peer Ban Time',
					description: 'Default duration (in seconds) of manually configured bans',
					defaultValue: '86400',
				},
				bind: {
					type: EditorValueType.TEXT,
					title: 'Bind to IP Address',
					description:
						'Bind to given address and always listen on it. Use [host]:port notation for IPv6. Append =onion to tag any incoming connections to that address and port as incoming Tor connections',
					shortDescription: 'Bind to given address and always listen on it',
					defaultValue: {
						clearnet: '0.0.0.0',
						'mainnet tor': '127.0.0.1:8334=onion',
						'testnet3 tor': '127.0.0.1:18334=onion',
						'testnet4 tor': '127.0.0.1:48334=onion',
						'signet tor': '127.0.0.1:38334=onion',
						'regtest tor': '127.0.0.1:18445=onion',
					},
				},
				cjdnsreachable: {
					type: EditorValueType.CHECKBOX,
					title: 'CJDNS Reachable',
					description:
						'If set, then this host is configured for CJDNS (connecting to fc00::/8 addresses would lead us to the CJDNS network)',
					shortDescription: 'If set, then this host is configured for CJDNS',
					defaultValue: '0',
				},
				connect: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Only Connect to Peer',
					description:
						'Connect only to the specified node, <a href="#noconnect">noconnect</a> disables automatic connections (the rules for this peer are the same as for <a href="#addnode">addnode</a>). This option can be specified multiple times to connect to multiple nodes',
					shortDescription: 'Connect only to the specified node',
				},
				discover: {
					type: EditorValueType.CHECKBOX,
					title: 'Discover IP Address',
					description:
						'Discover own IP addresses (default: 1 when <a href="#listen">listening</a> and no <a href="#externalip">externalip</a> or <a href="#proxy">proxy</a>)',
					shortDescription: 'Discover own IP addresses',
					defaultValue: '1',
				},
				dns: {
					type: EditorValueType.CHECKBOX,
					title: 'Allow DNS Lookups',
					description:
						'Allow DNS lookups for <a href="#addnode">addnode</a>, <a href="#seednode">seednode</a> and <a href="#connect">connect</a>',
					shortDescription: 'Allow DNS lookups',
					defaultValue: '1',
				},
				dnsseed: {
					type: EditorValueType.CHECKBOX,
					title: 'Use DNS Seed',
					description:
						'Query for peer addresses via DNS lookup, if low on addresses (default: 1 unless <a href="#connect">connect</a> used or <a href="#maxconnections">maxconnections</a>=0)',
					shortDescription: 'Query for peer addresses via DNS lookup, if low on addresses',
					defaultValue: '1',
				},
				externalip: {
					type: EditorValueType.TEXT,
					title: 'External IP Address',
					description: 'Specify your own public IP address',
				},
				fixedseeds: {
					type: EditorValueType.CHECKBOX,
					title: 'Use Fixed Seeds',
					description: "Allow fixed seeds if DNS seeds don't provide peers",
					defaultValue: '1',
				},
				forcednsseed: {
					type: EditorValueType.CHECKBOX,
					title: 'Force DNS Seed',
					description: 'Always query for peer addresses via DNS lookup',
					defaultValue: '0',
				},
				i2pacceptincoming: {
					type: EditorValueType.CHECKBOX,
					title: 'Accept Incoming I2P Connections',
					description:
						'Whether to accept inbound I2P connections. Ignored if <a href="#i2psam">i2psam</a> is not set. Listening for incoming I2P connections is done through the SAM proxy, not by binding to a local address and port',
					shortDescription: 'Whether to accept inbound I2P connections',
					defaultValue: '1',
				},
				i2psam: {
					type: EditorValueType.TEXT,
					title: 'I2P SAM Proxy',
					description:
						'I2P SAM proxy &lt;ip:port&gt; to reach I2P peers and accept I2P connections',
					shortDescription: 'I2P SAM proxy <ip:port> to reach I2P peers and accept I2P connections',
				},
				listen: {
					type: EditorValueType.CHECKBOX,
					title: 'Listen for Incoming Connections',
					description:
						'Accept connections from outside (default: 1 if no <a href="#proxy">proxy</a>, <a href="#connect">connect</a> or <a href="#maxconnections">maxconnections</a>=0)',
					shortDescription: 'Accept connections from outside',
					defaultValue: '1',
				},
				listenonion: {
					type: EditorValueType.CHECKBOX,
					title: 'Tor Hidden Service',
					description: 'Automatically create Tor onion service',
					defaultValue: '1',
				},
				maxconnections: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Peer Connections',
					description:
						'Maintain at most &lt;n&gt; automatic connections to peers. This limit does not apply to connections manually added via <a href="#addnode">addnode</a> or the addnode RPC, which have a separate limit of 8',
					shortDescription: 'Maintain at most <n> automatic connections to peers',
					defaultValue: '125',
				},
				maxreceivebuffer: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Receive Buffer',
					description: 'Maximum per-connection receive buffer, &lt;n&gt;*1000 bytes',
					shortDescription: 'Maximum per-connection receive buffer, <n>*1000 bytes',
					defaultValue: '5000',
				},
				maxsendbuffer: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Send Buffer',
					description: 'Maximum per-connection send buffer, &lt;n&gt;*1000 bytes',
					shortDescription: 'Maximum per-connection send buffer, <n>*1000 bytes',
					defaultValue: '1000',
				},
				maxuploadtarget: {
					type: EditorValueType.TEXT,
					title: 'Max Upload Target',
					description:
						"Tries to keep outbound traffic under the given target per 24h. Limit does not apply to peers with 'download' permission or blocks created within past week. 0 = no limit. Optional suffix units [k|K|m|M|g|G|t|T] (default: M). Lowercase is 1000 base while uppercase is 1024 base",
					shortDescription: 'Tries to keep outbound traffic under the given target per 24h',
					defaultValue: '0M',
				},
				natpmp: {
					type: EditorValueType.CHECKBOX,
					title: 'NAT Port Mapping Protocol',
					description: 'Use PCP or NAT-PMP to map the listening port',
					defaultValue: '0',
				},
				networkactive: {
					type: EditorValueType.CHECKBOX,
					title: 'Network Active',
					description:
						'Enable all P2P network activity. Can be changed by the setnetworkactive RPC command',
					shortDescription: 'Enable all P2P network activity',
					defaultValue: '1',
				},
				noconnect: {
					type: EditorValueType.CHECKBOX,
					title: 'No Automatic Connections',
					description: 'Disable automatic connections to peers',
					defaultValue: '0',
				},
				noonion: {
					type: EditorValueType.CHECKBOX,
					title: 'No Tor Proxy',
					description:
						'Disable connecting through separate SOCKS5 proxy &lt;ip:port|path&gt; to reach peers via Tor hidden services',
					shortDescription: 'Disable connecting to Tor hidden services',
					defaultValue: '0',
				},
				noproxy: {
					type: EditorValueType.CHECKBOX,
					title: 'No Proxy Connection',
					description: 'Disable connecting through SOCKS5 proxy',
					defaultValue: '0',
				},
				onion: {
					type: EditorValueType.TEXT,
					title: 'Tor Proxy',
					description:
						'Use separate SOCKS5 proxy &lt;ip:port|path&gt; to reach peers via Tor hidden services. Set <a href="#noonion">noonion</a> to disable (default: <a href="#proxy">proxy</a>). May be a local file path prefixed with \'unix:\'',
					shortDescription:
						'Use separate SOCKS5 proxy <ip:port|path> to reach peers via Tor hidden services',
				},
				onlynet: {
					type: EditorValueType.MULTI_SELECT,
					title: 'Only Use Specific Network',
					description:
						'Make automatic outbound connections only to the selected network. Inbound and manual connections are not affected by this option. It can be specified multiple times to allow multiple networks',
					shortDescription: 'Make automatic outbound connections only to the selected network',
					options: [
						{ value: 'ipv4', label: 'IPv4' },
						{ value: 'ipv6', label: 'IPv6' },
						{ value: 'onion', label: 'Tor' },
						{ value: 'i2p', label: 'I2P' },
						{ value: 'cjdns', label: 'cjdns' },
					],
				},
				peerblockfilters: {
					type: EditorValueType.CHECKBOX,
					title: 'Peer Block Filters',
					description:
						'Serve compact block filters to peers per BIP 157. NOTE: enabling this will force <a href="#blockfilterindex">blockfilterindex</a> on',
					shortDescription: 'Serve compact block filters to peers',
					defaultValue: '0',
				},
				peerbloomfilters: {
					type: EditorValueType.CHECKBOX,
					title: 'Peer Bloom Filters',
					description: 'Support filtering of blocks and transactions with bloom filters',
					defaultValue: '0',
				},
				peertimeout: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						wholeNumber: true,
					},
					title: 'Peer Timeout',
					description:
						'Specify a p2p connection timeout delay in seconds. After connecting to a peer, wait this amount of time before considering disconnection based on inactivity',
					shortDescription: 'Specify a p2p connection timeout delay in seconds',
					defaultValue: '60',
				},
				port: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						max: 65535,
					},
					title: 'Listen Port',
					description:
						'Listen for incoming connections on non-default port. Not relevant for I2P (see doc/i2p.md). If set to a value x, the default onion listening port will be set to x+1',
					shortDescription: 'Listen for incoming connections on non-default port',
					defaultValue: {
						mainnet: '8333',
						testnet3: '18333',
						testnet4: '48333',
						signet: '38333',
						regtest: '18444',
					},
				},
				proxy: {
					type: EditorValueType.TEXT,
					title: 'Proxy Connection',
					description:
						'Connect through &lt;ip:port|path&gt; SOCKS5 proxy, set <a href="#noproxy">noproxy</a> to disable. May be a local file path prefixed with \'unix:\' if the proxy supports it',
					shortDescription: 'Connect through <ip:port|path> SOCKS5 proxy',
				},
				proxyrandomize: {
					type: EditorValueType.CHECKBOX,
					title: 'Randomize Proxy',
					description:
						'Randomize credentials for every proxy connection. This enables Tor stream isolation',
					shortDescription: 'Randomize credentials for every proxy connection',
					defaultValue: '1',
				},
				seednode: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Seed Node',
					description:
						'Connect to a node (IP address) to retrieve peer addresses, then disconnect. This option can be specified multiple times to connect to multiple nodes. During startup, seed nodes will be tried before <a href="#dnsseed">dnsseeds</a>',
					shortDescription:
						'Connect to a node (IP address) to retrieve peer addresses, then disconnect',
				},
				timeout: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						wholeNumber: true,
					},
					title: 'Connection Timeout',
					description:
						'Initial peer connection timeout in milliseconds. If an initial attempt to connect is unsuccessful after this amount of time, drop it',
					shortDescription: 'Initial peer connection timeout in milliseconds',
					defaultValue: '5000',
				},
				torcontrol: {
					type: EditorValueType.TEXT,
					title: 'Tor Control',
					description:
						'Tor control  &lt;ip:port&gt; to use if onion listening enabled. If no port is specified, the default port of 9051 will be used',
					shortDescription: 'Tor control <ip:port> to use if onion listening enabled',
					defaultValue: '127.0.0.1:9051',
				},
				torpassword: {
					type: EditorValueType.TEXT,
					title: 'Tor Control Password',
					description: 'Tor control port password',
				},
				txreconciliation: {
					type: EditorValueType.CHECKBOX,
					title: 'Transaction Reconciliation',
					description: 'Enable transaction reconciliations per BIP 330',
					defaultValue: '0',
				},
				v2transport: {
					type: EditorValueType.CHECKBOX,
					title: 'v2 Transport',
					description: 'Support encrypted v2 transport protocol',
					defaultValue: '1',
				},
				whitebind: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Whitelist Bound IP Address',
					description:
						'Bind to the given address and add permission flags &lt;[permissions@]addr&gt; to the peers connecting to it. Use [host]:port notation for IPv6. Allowed permissions:<br><br><dl><dt>bloomfilter</dt><dd>allow requesting BIP37 filtered blocks and transactions</dd><br><dt>noban</dt><dd>do not ban for misbehavior; implies download</dd><br><dt>forcerelay</dt><dd>relay transactions that are already in the mempool; implies relay</dd><br><dt>relay</dt><dd>relay even in <a href="#blocksonly">blocksonly</a> mode, and unlimited transaction announcements</dd><br><dt>mempool</dt><dd>allow requesting BIP35 mempool contents</dd><br><dt>download</dt><dd>allow getheaders during IBD, no disconnect after maxuploadtarget limit</dd><br><dt>addr</dt><dd>responses to GETADDR avoid hitting the cache and contain random records with the most up-to-date info</dd></dl><br>Specify multiple permissions separated by commas. Can be specified multiple times',
					shortDescription:
						'Bind to the given address and add permission flags to the peers connecting to it',
					defaultValue: 'download,noban,mempool,relay',
				},
				whitelist: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Whitelist Peer',
					description:
						'Add permission flags &lt;[permissions@]IP address or network&gt; to the peers using the given IP address (e.g. 1.2.3.4) or CIDR-notated network (e.g. 1.2.3.0/24). Uses the same permissions as <a href="#whitebind">whitebind</a>. Additional flags "in" and "out" control whether permissions apply to incoming connections and/or manual (default: incoming only). Can be specified multiple times',
					shortDescription: 'Add permission flags to the peers using the given IP address',
				},
			},
		},
		{
			title: 'Mempool',
			description: 'What transactions your node will relay to peers',
			configs: {
				acceptnonstdtxn: {
					type: EditorValueType.CHECKBOX,
					title: 'Accept Non-Standard Transactions',
					description: 'Relay and mine "non-standard" transactions (test networks only)',
					defaultValue: '0',
				},
				bytespersigop: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Bytes Per Signature Operation',
					description: 'Equivalent bytes per sigop in transactions for relay and mining',
					defaultValue: '20',
				},
				datacarrier: {
					type: EditorValueType.CHECKBOX,
					title: 'Data Carrier',
					description: 'Relay and mine data carrier transactions',
					defaultValue: '1',
				},
				datacarriersize: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Data Carrier Size',
					description:
						'Relay and mine transactions whose data-carrying raw scriptPubKey is of &lt;n&gt; or less bytes',
					shortDescription:
						'Relay/mine txs whose data-carrying raw scriptPubKey is of <n> or less bytes',
					defaultValue: '83',
				},
				dustrelayfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Dust Relay Fee',
					description:
						'Fee rate (in BTC/kvB) used to define dust, the value of an output such that it will cost more than its value in fees at this fee rate to spend it',
					shortDescription: 'Fee rate (in BTC/kvB) used to define dust',
					defaultValue: '0.00003',
				},
				incrementalrelayfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Incremental Relay Fee',
					description:
						'Fee rate (in BTC/kB) used to define cost of relay, used for mempool limiting and replacement policy',
					shortDescription: 'Fee rate (in BTC/kB) used to define cost of relay',
					defaultValue: '0.00001',
				},
				minrelaytxfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Minimum Transaction Relay Fee',
					description:
						'Fees (in BTC/kvB) smaller than this are considered zero fee for relaying, mining and transaction creation',
					shortDescription: 'Fees (in BTC/kvB) smaller than this are considered zero fee',
					defaultValue: '0.00001',
				},
				permitbaremultisig: {
					type: EditorValueType.CHECKBOX,
					title: 'Permit Bare Multisig',
					description: 'Relay transactions creating non-P2SH multisig outputs',
					defaultValue: '1',
				},
				whitelistforcerelay: {
					type: EditorValueType.CHECKBOX,
					title: 'Whitelist Force Relay',
					description:
						"Add 'forcerelay' permission to whitelisted peers with default permissions. This will relay transactions even if the transactions were already in the mempool",
					shortDescription:
						"Add 'forcerelay' permission to whitelisted peers with default permissions",
					defaultValue: '0',
				},
				whitelistrelay: {
					type: EditorValueType.CHECKBOX,
					title: 'Whitelist Relay',
					description:
						"Add 'relay' permission to whitelisted peers with default permissions. This will accept relayed transactions even when not relaying transactions",
					shortDescription: "Add 'relay' permission to whitelisted peers with default permissions",
					defaultValue: '1',
				},
			},
		},
		{
			title: 'Mining',
			description: 'Attributes of blocks that can be mined by your node',
			configs: {
				blockmaxweight: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Max Block Weight',
					description: 'Set maximum BIP141 block weight',
					defaultValue: '4000000',
				},
				blockmintxfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Block Min Transaction Fee',
					description:
						'Set lowest fee rate (in BTC/kB) for transactions to be included in block creation',
					shortDescription: 'Set lowest fee rate (in BTC/kB) for tx inclusion in block creation',
					defaultValue: '0.00001',
				},
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
				blockversion: {
					type: EditorValueType.TEXT,
					title: 'Block Version',
					description: 'Override block version to test forking scenarios',
				},
			},
		},
		{
			title: 'RPC',
			description: "Security and performance options for accessing your node's RPC interface",
			configs: {
				rest: {
					type: EditorValueType.CHECKBOX,
					title: 'Enable REST API',
					description: 'Accept public REST requests',
					defaultValue: '0',
				},
				rpcallowip: {
					type: EditorValueType.MULTI_TEXT,
					title: 'RPC Allow IP Address',
					description:
						'Allow JSON-RPC connections from specified source. Valid are a single IP (e.g. 1.2.3.4), a network/netmask (e.g. 1.2.3.4/255.255.255.0) a network/CIDR (e.g. 1.2.3.4/24), all ipv4 (0.0.0.0/0), or all ipv6 (::/0). This option can be specified multiple times',
					shortDescription: 'Allow JSON-RPC connections from specified source',
				},
				rpcauth: {
					type: EditorValueType.MULTI_TEXT,
					title: 'RPC Authentication',
					description:
						'Username and HMAC-SHA-256 hashed password for JSON-RPC connections, to be provided in the format: &lt;USERNAME&gt;:&lt;SALT&gt;$&lt;HASH&gt;. A canonical python script is included in share/rpcauth. The client then connects normally using the rpcuser=&lt;USERNAME&gt;/rpcpassword=&lt;PASSWORD&gt; pair of arguments. This option can be specified multiple times',
					shortDescription: 'Username and HMAC-SHA-256 hashed password for JSON-RPC connections',
				},
				rpcbind: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Bind RPC Address',
					description:
						'Bind to given address to listen for JSON-RPC connections. Do not expose the RPC server to untrusted networks such as the public internet! This option is ignored unless <a href="#rpcallowip">rpcallowip</a> is also passed. Port is optional and overrides <a href="#rpcport">rpcport</a>. Use [host]:port notation for IPv6. This option can be specified multiple times',
					shortDescription: 'Bind to given address to listen for JSON-RPC connections',
					defaultValue: '127.0.0.1, ::1',
				},
				rpccookiefile: {
					type: EditorValueType.TEXT,
					title: 'RPC Cookie File',
					description:
						'Location of the RPC auth cookie. Relative paths will be prefixed by a net-specific <a href="#datadir">datadir</a> location',
					shortDescription: 'Location of the RPC auth cookie',
					defaultValue: '<a href="#datadir">datadir</a>',
				},
				rpccookieperms: {
					knotsExclusive: true,
					type: EditorValueType.TEXT,
					title: 'RPC Cookie Permissions',
					description:
						'Set the permissions on the RPC auth cookie file so that it is readable by [owner|group|all]',
					shortDescription: 'Set the permissions on the RPC auth cookie file',
					defaultValue: 'owner (via umask 0077)',
				},
				rpcdoccheck: {
					type: EditorValueType.CHECKBOX,
					title: 'RPC Documentation Check',
					description:
						'Throw a non-fatal error at runtime if the documentation for an RPC is incorrect',
					shortDescription: 'Throw non-fatal error at runtime if docs for an RPC are incorrect',
					defaultValue: '0',
				},
				rpcpassword: {
					type: EditorValueType.TEXT,
					title: 'RPC Password',
					description: 'Password for JSON-RPC connections',
				},
				rpcport: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						max: 65535,
					},
					title: 'RPC Port',
					description: 'Listen for JSON-RPC connections on this port',
					defaultValue: {
						mainnet: '8332',
						testnet3: '18332',
						testnet4: '48332',
						signet: '38332',
						regtest: '18443',
					},
				},
				rpcservertimeout: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						wholeNumber: true,
					},
					title: 'RPC Server Timeout',
					description: 'Number of seconds after which an uncompleted RPC call will time out',
					defaultValue: '30',
				},
				rpcthreads: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						wholeNumber: true,
					},
					title: 'RPC Threads',
					description: 'Number of threads to service RPC calls',
					defaultValue: '16',
				},
				rpcuser: {
					type: EditorValueType.TEXT,
					title: 'RPC User',
					description: 'Username for JSON-RPC connections',
				},
				rpcwhitelist: {
					type: EditorValueType.MULTI_TEXT,
					title: 'RPC Whitelist',
					description:
						'Set a whitelist to filter incoming RPC calls for a specific user. To be specified in the format: &lt;USERNAME&gt;:&lt;rpc 1&gt;,&lt;rpc 2&gt;,...,&lt;rpc n&gt;. This option can be specified multiple times. If multiple whitelists are set for a given user, they are set-intersected. See <a href="#rpcwhitelistdefault">rpcwhitelistdefault</a> documentation for information on default whitelist behavior',
					shortDescription: 'Set a whitelist to filter incoming RPC calls for a specific user',
				},
				rpcwhitelistdefault: {
					type: EditorValueType.TEXT,
					title: 'RPC Whitelist Default',
					description:
						'Sets default behavior for rpc whitelisting. Unless set to 0, if any <a href="#rpcwhitelist">rpcwhitelist</a> is set, the rpc server acts as if all rpc users are subject to empty-unless-otherwise-specified whitelists. If set to 1 and no <a href="#rpcwhitelist">rpcwhitelist</a> is set, rpc server acts as if all rpc users are subject to empty whitelists',
					shortDescription: 'Default behavior for rpc whitelisting',
				},
				rpcworkqueue: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 1,
						wholeNumber: true,
					},
					title: 'RPC Work Queue Size',
					description: 'Maximum depth of the work queue to service RPC calls',
					defaultValue: '64',
				},
				server: {
					type: EditorValueType.CHECKBOX,
					title: 'Enable RPC Server',
					description: 'Accept command line and JSON-RPC commands',
					defaultValue: '0',
				},
			},
		},
		{
			title: 'Wallet',
			description: "Behavior of your node's wallet",
			configs: {
				addresstype: {
					type: EditorValueType.SELECT,
					title: 'Address Type',
					description: 'What type of addresses to use',
					options: [
						{ value: 'legacy', label: 'Legacy' },
						{ value: 'p2sh-segwit', label: 'P2SH Wrapped SegWit' },
						{ value: 'bech32', label: 'Bech32' },
						{ value: 'bech32m', label: 'Bech32m' },
					],
					defaultValue: 'bech32',
				},
				avoidpartialspends: {
					type: EditorValueType.CHECKBOX,
					title: 'Avoid Partial Spends',
					description:
						'Group outputs by address, selecting many (possibly all) or none, instead of selecting on a per-output basis. Privacy is improved as addresses are mostly swept with fewer transactions and outputs are aggregated in clean change addresses. It may result in higher fees due to less optimal coin selection caused by this added limitation and possibly a larger-than-necessary number of inputs being used. Always enabled for wallets with "avoid_reuse" enabled, otherwise default: 0',
					shortDescription:
						'Group outputs by address, selecting many (possibly all) or none, instead of selecting on a per-output basis',
					defaultValue: '0',
				},
				changetype: {
					type: EditorValueType.SELECT,
					title: 'Change Address Type',
					description:
						'What type of change address to use. Default is "legacy" when <a href="#addresstype">addresstype</a>=legacy, else it is an implementation detail',
					shortDescription: 'What type of change address to use',
					options: [
						{ value: 'legacy', label: 'Legacy' },
						{ value: 'p2sh-segwit', label: 'P2SH Wrapped SegWit' },
						{ value: 'bech32', label: 'Bech32' },
						{ value: 'bech32m', label: 'Bech32m' },
					],
					defaultValue: 'bech32',
				},
				consolidatefeerate: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Consolidation Fee Rate',
					description:
						"The maximum feerate (in BTC/kvB) at which transaction building may use more inputs than strictly necessary so that the wallet's UTXO pool can be reduced",
					shortDescription:
						'Maximum feerate (in BTC/kvB) at which transactions may use more inputs',
					defaultValue: '0.0001',
				},
				dblogsize: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'DB Log Size',
					description:
						'Flush wallet database activity from memory to disk log every &lt;n&gt; megabytes',
					shortDescription:
						'Flush wallet database activity from memory to disk log every <n> megabytes',
					defaultValue: '100',
				},
				disablewallet: {
					type: EditorValueType.CHECKBOX,
					title: 'Disable Wallet',
					description: 'Do not load the wallet and disable wallet RPC calls',
					defaultValue: '0',
				},
				discardfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Discard Change Fee',
					description:
						'The fee rate (in BTC/kB) that indicates your tolerance for discarding change by adding it to the fee. Note: An output is discarded if it is dust at this rate, but we will always discard up to the dust relay fee and a discard fee above that is limited by the fee estimate for the longest target',
					shortDescription:
						'Fee rate (in BTC/kB) that indicates tolerance for discarding change by adding it to the fee',
					defaultValue: '0.0001',
				},
				fallbackfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Fallback Transaction Fee',
					description:
						'A fee rate (in BTC/kB) that will be used when fee estimation has insufficient data. Set to 0 to entirely disable the fallbackfee feature',
					shortDescription:
						'Fee rate (in BTC/kB) that will be used when fee estimation has insufficient data',
					defaultValue: '0.0',
				},
				flushwallet: {
					type: EditorValueType.CHECKBOX,
					title: 'Flush Wallet Automatically',
					description: 'Run a thread to flush wallet periodically',
					defaultValue: '1',
				},
				keypool: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Key Pool Size',
					description:
						'Set key pool size. Warning: Smaller sizes may increase the risk of losing funds when restoring from an old backup, if none of the addresses in the original keypool have been used',
					shortDescription: 'Set key pool size',
					defaultValue: '1000',
				},
				maxapsfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Avoid Partial Spend Fee',
					description:
						'Spend up to this amount in additional (absolute) fees (in BTC) if it allows the use of partial spend avoidance',
					shortDescription:
						'Spend up to this amount in additional (absolute) fees (in BTC) to avoid partial spends',
					defaultValue: '0.0',
				},
				mintxfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Minimum Transaction Fee',
					description:
						'Fee rates (in BTC/kB) smaller than this are considered zero fee for transaction creation',
					shortDescription:
						'Fee rates (in BTC/kB) smaller than this are considered zero for tx creation',
					defaultValue: '0.00001',
				},
				paytxfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Pay Transaction Fee',
					description: 'Fee rate (in BTC/kvB) to add to transactions you send',
					defaultValue: '0.0',
				},
				privdb: {
					type: EditorValueType.CHECKBOX,
					title: 'Private DB',
					description: 'Set the DB_PRIVATE flag in the wallet db environment',
					defaultValue: '1',
				},
				signer: {
					type: EditorValueType.TEXT,
					title: 'Signer Command',
					description: 'External signing tool, see doc/external-signer.md',
				},
				spendzeroconfchange: {
					type: EditorValueType.CHECKBOX,
					title: 'Spend Unconfirmed Change',
					description: 'Spend unconfirmed change when sending transactions',
					defaultValue: '1',
				},
				swapbdbendian: {
					type: EditorValueType.CHECKBOX,
					title: 'Swap DB Endianness',
					description: 'Swaps the internal endianness of BDB wallet databases',
					defaultValue: '0',
				},
				txconfirmtarget: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Transaction Fee Confirmation Target',
					description:
						'If <a href="#paytxfee">paytxfee</a> is not set, include enough fee so that transactions begin confirmation on average within &lt;n&gt; blocks',
					shortDescription:
						'If paytxfee not set, add fee so txs begin confirmation on avg within <n> blocks',
					defaultValue: '6',
				},
				unsafesqlitesync: {
					type: EditorValueType.CHECKBOX,
					title: 'Unsafe SQL Lite Sync',
					description:
						'Set SQLite synchronous=OFF to disable waiting for the database to sync to disk. This is unsafe and can cause data loss and corruption. This option is only used by tests to improve their performance',
					shortDescription:
						'Set SQLite synchronous=OFF to disable waiting for database to sync to disk',
					defaultValue: '0',
				},
				wallet: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Wallet Path',
					description:
						'Specify wallet path to load at startup. Can be used multiple times to load multiple wallets. Path is to a directory containing wallet data and log files. If the path is not absolute, it is interpreted relative to <a href="#walletdir">walletdir</a>. This only loads existing wallets and does not create new ones. For backwards compatibility this also accepts names of existing top-level data files in <a href="#walletdir">walletdir</a>',
					shortDescription: 'Specify wallet path to load at startup',
				},
				walletbroadcast: {
					type: EditorValueType.CHECKBOX,
					title: 'Wallet Transaction Broadcast',
					description: 'Make the wallet broadcast transactions',
					defaultValue: '1',
				},
				walletcrosschain: {
					type: EditorValueType.CHECKBOX,
					title: 'Wallet Cross Chain',
					description: 'Allow reusing wallet files across chains',
					defaultValue: '0',
				},
				walletdir: {
					type: EditorValueType.TEXT,
					title: 'Wallet Directory Location',
					description:
						'Specify directory to hold wallets (default: <a href="#datadir">&lt;datadir&gt;</a>/wallets if it exists, otherwise <a href="#datadir">&lt;datadir&gt;</a>)',
					shortDescription: 'Specify directory to hold wallets',
					defaultValue: '<a href="#datadir">&lt;datadir&gt;</a>[/wallets]',
				},
				walletnotify: {
					type: EditorValueType.TEXT,
					title: 'Wallet Notification',
					description:
						"Execute command when a wallet transaction changes. %s in cmd is replaced by TxID, %w is replaced by wallet name, %b is replaced by the hash of the block including the transaction (set to 'unconfirmed' if the transaction is not included) and %h is replaced by the block height (-1 if not included). %w is not currently implemented on windows. On systems where %w is supported, it should NOT be quoted because this would break shell escaping used to invoke the command",
					shortDescription: 'Execute command when a wallet transaction changes',
				},
				walletrbf: {
					type: EditorValueType.CHECKBOX,
					title: 'Enable Replace By Fee Transactions',
					description: 'Send transactions with full-RBF opt-in enabled (RPC only)',
					defaultValue: '1',
				},
				walletrejectlongchains: {
					type: EditorValueType.CHECKBOX,
					title: 'Reject Long Transaction Chains',
					description: 'Wallet will not create transactions that violate mempool chain limits',
					defaultValue: '1',
				},
			},
		},
		{
			title: 'ZeroMQ',
			description: 'Options for handling notifications emitted via ZeroMQ',
			configs: {
				zmqpubhashblock: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						base58: true,
					},
					title: 'Publish Block Hashes',
					description: 'Enable publishing of block hashes to &lt;address&gt;',
					shortDescription: 'Enable publishing of block hashes to <address>',
				},
				zmqpubhashblockhwm: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Publish Block Hashes High Water Mark',
					description: 'Set publish hash block outbound message high water mark',
					defaultValue: '1000',
				},
				zmqpubhashtx: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						base58: true,
					},
					title: 'Publish Transaction Hashes',
					description: 'Enable publishing of transaction hashes to &lt;address&gt;',
					shortDescription: 'Enable publishing of transaction hashes to <address>',
				},
				zmqpubhashtxhwm: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Publish Transaction Hashes High Water Mark',
					description: 'Set publish hash transaction outbound message high water mark',
					defaultValue: '1000',
				},
				zmqpubrawblock: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						base58: true,
					},
					title: 'Publish Raw Blocks',
					description: 'Enable publishing of raw block hex to &lt;address&gt;',
					shortDescription: 'Enable publishing of raw block hex to <address>',
				},
				zmqpubrawblockhwm: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Publish Raw Blocks High Water Mark',
					description: 'Set publish raw block outbound message high water mark',
					defaultValue: '1000',
				},
				zmqpubrawtx: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						base58: true,
					},
					title: 'Publish Raw Transactions',
					description: 'Enable publishing of raw transaction hex to &lt;address&gt;',
					shortDescription: 'Enable publishing of raw transaction hex to <address>',
				},
				zmqpubrawtxhwm: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Publish Wallet Transaction Hashes High Water Mark',
					description: 'Set publish raw transaction outbound message high water mark',
					defaultValue: '1000',
				},
				zmqpubsequence: {
					type: EditorValueType.TEXT,
					typeConstraints: {
						base58: true,
					},
					title: 'Publish Hash Block and Transaction Sequence',
					description: 'Enable publish hash block and tx sequence in &lt;address&gt;',
					shortDescription: 'Enable publish hash block and tx sequence in <address>',
				},
				zmqpubsequencehwm: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Publish Hash Sequence Message High Water Mark',
					description: 'Set publish hash sequence message high water mark',
					defaultValue: '1000',
				},
			},
		},
		{
			title: 'Debugging & Testing',
			description: 'Features that help developers',
			configs: {
				acceptstalefeeestimates: {
					type: EditorValueType.CHECKBOX,
					title: 'Accept Stale Fee Estimates',
					description:
						'Read fee estimates even if they are stale (regtest only) fee estimates are considered stale if they are 60 hours old',
					shortDescription: 'Read fee estimates even if they are stale (regtest only)',
					defaultValue: '0',
				},
				capturemessages: {
					type: EditorValueType.CHECKBOX,
					title: 'Capture Messages',
					description: 'Capture all P2P messages to disk',
					defaultValue: '0',
				},
				checkaddrman: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Check Address Manager',
					description: 'Run addrman consistency checks every n operations. Use 0 to disable',
					shortDescription: 'Run addrman consistency checks every n operations',
					defaultValue: '0',
				},
				checkblockindex: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Check Block Index',
					description:
						'Do a consistency check for the block tree, chainstate, and other validation data structures every n operations. Use 0 to disable. (default: 0, regtest: 1)',
					shortDescription:
						'Do consistency check for block tree, chainstate, and other validation data structures every n ops',
					defaultValue: '0',
				},
				checkblocks: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Check Blocks',
					description: 'How many blocks to check at startup (0 = all)',
					defaultValue: '6',
				},
				checklevel: {
					type: EditorValueType.SELECT,
					title: 'Check Block Index',
					description:
						'How thorough the block verification of <a href="#checkblocks">checkblocks</a> is:<br><br><dl><dt>level 0</dt><dd>reads the blocks from disk</dd><br><dt>level 1</dt><dd>verifies block validity</dd><br><dt>level 2</dt><dd>verifies undo data</dd><br><dt>level 3</dt><dd>checks disconnection of tip blocks</dd><br><dt>level 4</dt><dd>tries to reconnect the blocks</dd></dl><br>Each level includes the checks of the previous levels',
					shortDescription: 'How thorough the block verification of -checkblocks is',
					options: [
						{ value: '0', label: 'Level 0' },
						{ value: '1', label: 'Level 1' },
						{ value: '2', label: 'Level 2' },
						{ value: '3', label: 'Level 3' },
						{ value: '4', label: 'Level 4' },
					],
					defaultValue: '3',
				},
				checkmempool: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Check Mempool',
					description:
						'Run mempool consistency checks every n transactions. Use 0 to disable (default: 0, regtest: 1)',
					shortDescription: 'Run mempool consistency checks every n transactions',
					defaultValue: '0',
				},
				checkpoints: {
					type: EditorValueType.CHECKBOX,
					title: 'Enable Checkpoints',
					description:
						'Enable rejection of any forks from the known historical chain until block 295000',
					shortDescription: 'Reject forks from the known historical chain until block 295000',
					defaultValue: '1',
				},
				debug: {
					type: EditorValueType.MULTI_SELECT,
					title: 'Debug Logging',
					description:
						'Output debug and trace logging. If set to 1 or "all", output for all categories. If set to 0 or "none", disable for all previously set categories. This option can be specified multiple times to output multiple categories',
					shortDescription: 'Output debug and trace logging',
					options: [
						{ value: 'all', label: 'Enable all' },
						{ value: 'none', label: 'Disable previous' },
						{ value: 'addrman', label: 'Address manager' },
						{ value: 'bench', label: 'Benchmarking' },
						{ value: 'blockstorage', label: 'Block storage' },
						{ value: 'cmpctblock', label: 'Compact blocks' },
						{ value: 'coindb', label: 'Coin database' },
						{ value: 'estimatefee', label: 'Fee Estimation' },
						{ value: 'http', label: 'HTTP' },
						{ value: 'i2p', label: 'I2P' },
						{ value: 'ipc', label: 'IPC' },
						{ value: 'leveldb', label: 'LevelDB' },
						{ value: 'libevent', label: 'LibEvent' },
						{ value: 'mempool', label: 'Mempool' },
						{ value: 'mempoolrej', label: 'Mempool rejection' },
						{ value: 'net', label: 'Networking' },
						{ value: 'proxy', label: 'Proxy' },
						{ value: 'prune', label: 'Pruning' },
						{ value: 'qt', label: 'QT' },
						{ value: 'rand', label: 'Randomness' },
						{ value: 'reindex', label: 'Reindexing' },
						{ value: 'rpc', label: 'RPC' },
						{ value: 'scan', label: 'Scan' },
						{ value: 'selectcoins', label: 'Coin selection' },
						{ value: 'tor', label: 'TOR' },
						{ value: 'txpackages', label: 'Tx packages' },
						{ value: 'txreconciliation', label: 'Tx reconciliation' },
						{ value: 'validation', label: 'Tx validation' },
						{ value: 'walletdb', label: 'Wallet database' },
						{ value: 'zmq', label: 'ZeroMQ' },
					],
					defaultValue: 'none',
				},
				debugexclude: {
					type: EditorValueType.MULTI_SELECT,
					title: 'Exclude Debug Logging',
					description:
						'Exclude debug and trace logging for a category. Can be used in conjunction with <a href="#debug">debug</a>=all to output debug and trace logging for all categories except the specified category. This option can be specified multiple times to exclude multiple categories. This takes priority over <a href="#debug">debug</a>',
					shortDescription: 'Exclude debug and trace logging for a category',
					options: [
						{ value: 'addrman', label: 'Address manager' },
						{ value: 'bench', label: 'Benchmarking' },
						{ value: 'blockstorage', label: 'Block storage' },
						{ value: 'cmpctblock', label: 'Compact blocks' },
						{ value: 'coindb', label: 'Coin database' },
						{ value: 'estimatefee', label: 'Fee Estimation' },
						{ value: 'http', label: 'HTTP' },
						{ value: 'i2p', label: 'I2P' },
						{ value: 'ipc', label: 'IPC' },
						{ value: 'leveldb', label: 'LevelDB' },
						{ value: 'libevent', label: 'LibEvent' },
						{ value: 'mempool', label: 'Mempool' },
						{ value: 'mempoolrej', label: 'Mempool rejection' },
						{ value: 'net', label: 'Networking' },
						{ value: 'proxy', label: 'Proxy' },
						{ value: 'prune', label: 'Pruning' },
						{ value: 'qt', label: 'QT' },
						{ value: 'rand', label: 'Randomness' },
						{ value: 'reindex', label: 'Reindexing' },
						{ value: 'rpc', label: 'RPC' },
						{ value: 'scan', label: 'Scan' },
						{ value: 'selectcoins', label: 'Coin selection' },
						{ value: 'tor', label: 'TOR' },
						{ value: 'txpackages', label: 'Tx packages' },
						{ value: 'txreconciliation', label: 'Tx reconciliation' },
						{ value: 'validation', label: 'Tx validation' },
						{ value: 'walletdb', label: 'Wallet database' },
						{ value: 'zmq', label: 'ZeroMQ' },
					],
				},
				deprecatedrpc: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Enable Deprecated RPC Commands',
					description:
						'Allows deprecated RPC method(s) to be used. The release notes of each new major release come with detailed instructions on what RPC features were deprecated and how to re-enable them temporarily. This option can be set multiple times',
					shortDescription: 'Allows deprecated RPC method(s) to be used',
				},
				fastprune: {
					type: EditorValueType.CHECKBOX,
					title: 'Fast Prune',
					description:
						'Use smaller block files and lower minimum prune height for testing purposes',
					defaultValue: '0',
				},
				limitancestorcount: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Limit Transaction Ancestor Count',
					description: 'Do not accept transactions if number of in-mempool ancestors is n or more',
					shortDescription: 'Reject txs if number of in-mempool ancestors is n or more',
					defaultValue: '25',
				},
				limitancestorsize: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Limit Transaction Ancestor Size',
					description:
						'Do not accept transactions whose size with all in-mempool ancestors exceeds n kilobytes',
					shortDescription: 'Reject txs whose size with all in-mempool ancestors exceeds n kB',
					defaultValue: '101',
				},
				limitdescendantcount: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Limit Transaction Descendant Count',
					description:
						'Do not accept transactions if any ancestor would have n or more in-mempool descendants',
					shortDescription:
						'Reject txs if any ancestor would have n or more in-mempool descendants',
					defaultValue: '25',
				},
				limitdescendantsize: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Limit Transaction Descendant Size',
					description:
						'Do not accept transactions if any ancestor would have more than n kilobytes of in-mempool descendants',
					shortDescription:
						'Reject txs if any ancestor would have more than n kB of in-mempool descendants',
					defaultValue: '101',
				},
				logips: {
					type: EditorValueType.CHECKBOX,
					title: 'Log IP Addresses',
					description: 'Include IP addresses in debug output',
					defaultValue: '0',
				},
				loglevel: {
					type: EditorValueType.MULTI_TEXT,
					title: 'Log Level',
					description:
						'Set the global or per-category severity level for logging categories enabled with the <a href="#debug">debug</a> configuration option or the logging RPC.<br><br> Possible values are:<br>info, debug, trace.<br><br>The following levels are always logged:<br>error, warning, info.<br><br>If &lt;category&gt;:&lt;level&gt; is supplied, the setting will override the global one and may be specified multiple times to set multiple category-specific levels.<br><br>&lt;category&gt; can be:<br>addrman, bench, blockstorage, cmpctblock, coindb, estimatefee, http, i2p, ipc, leveldb, libevent, mempool, mempoolrej, net, proxy, prune, qt, rand, reindex, rpc, scan, selectcoins, tor, txpackages, txreconciliation, validation, walletdb, zmq',
					shortDescription: 'Set the global or per-category severity level for logging categories',
					defaultValue: 'debug',
				},
				loglevelalways: {
					type: EditorValueType.CHECKBOX,
					title: 'Log Level Always',
					description: 'Always prepend a category and level',
					defaultValue: '0',
				},
				logsourcelocations: {
					type: EditorValueType.CHECKBOX,
					title: 'Log Source Locations',
					description:
						'Prepend debug output with name of the originating source location (source file, line number and function name)',
					shortDescription: 'Prepend debug output with name of the originating source location',
					defaultValue: '0',
				},
				logthreadnames: {
					type: EditorValueType.CHECKBOX,
					title: 'Log Thread Names',
					description: 'Prepend debug output with name of the originating thread',
					defaultValue: '0',
				},
				logtimemicros: {
					type: EditorValueType.CHECKBOX,
					title: 'Log Precise Timestamps',
					description: 'Add microsecond precision to debug timestamps',
					defaultValue: '0',
				},
				logtimestamps: {
					type: EditorValueType.CHECKBOX,
					title: 'Log Timestamps',
					description: 'Prepend debug output with timestamp',
					defaultValue: '1',
				},
				maxsigcachesize: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Signature Cache Size',
					description:
						'Limit sum of signature cache and script execution cache sizes to &lt;n&gt; MiB',
					shortDescription:
						'Limit sum of signature cache and script execution cache sizes to <n> MiB',
					defaultValue: '32',
				},
				maxtipage: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Max Age of Chain Tip',
					description: 'Maximum tip age in seconds to consider node in initial block download',
					defaultValue: '86400',
				},
				maxtxfee: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
					},
					title: 'Max Transaction Fee',
					description:
						'Maximum total fees (in BTC) to use in a single wallet transaction or raw transaction; setting this too low may abort large transactions',
					shortDescription: 'Max total fees (in BTC) to use in a single wallet tx or raw tx',
					defaultValue: '0.10',
				},
				mocktime: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Mock Timestamps',
					description: 'Replace actual time with UNIX epoch time (0 = disable)',
					defaultValue: '0',
				},
				printpriority: {
					type: EditorValueType.CHECKBOX,
					title: 'Print Priority',
					description: 'Log transaction fee rate in BTC/kvB when mining blocks',
					defaultValue: '0',
				},
				printtoconsole: {
					type: EditorValueType.CHECKBOX,
					title: 'Print To Console',
					description:
						'Send trace/debug info to console (default: 1 when no <a href="#daemon">daemon</a>. To disable logging to file, set <a href="#nodebuglogfile">nodebuglogfile</a>)',
					shortDescription: 'Send trace/debug info to console',
				},
				shrinkdebugfile: {
					type: EditorValueType.CHECKBOX,
					title: 'Shrink Debug Log File',
					description:
						'Shrink debug log file on client startup (default: 1 when no <a href="#debug">debug</a>)',
					shortDescription: 'Shrink debug log file on client startup',
				},
				stopafterblockimport: {
					type: EditorValueType.CHECKBOX,
					title: 'Stop After Block Import',
					description: 'Stop running after importing blocks from disk',
					defaultValue: '0',
				},
				stopatheight: {
					type: EditorValueType.NUMBER,
					typeConstraints: {
						min: 0,
						wholeNumber: true,
					},
					title: 'Stop At Height',
					description:
						'Stop running after reaching the given height in the main chain (0 = disable)',
					defaultValue: '0',
				},
				test: {
					type: EditorValueType.SELECT,
					title: 'Test-Only Option',
					description: 'Pass a test-only option',
					options: [
						{ value: 'addrman', label: 'Deterministic addrman' },
						{ value: 'bip94', label: 'BIP94 consensus rules' },
					],
				},
				testactivationheight: {
					type: EditorValueType.TEXT,
					title: 'Test Activation Height',
					description:
						'Set the activation height &lt;name&gt;@&lt;height&gt;<br><br>&lt;name&gt; can be:<br>segwit, bip34, dersig, cltv, csv<br><br>(regtest-only)',
					shortDescription: 'Set the activation height <name>@<height>',
				},
				uacomment: {
					type: EditorValueType.TEXT,
					title: 'User Agent Comment',
					description: 'Append comment to the user agent string',
				},
			},
		},
	] as CategoryDefinition[]
