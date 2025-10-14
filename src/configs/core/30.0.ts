import generateConfigCoreV29_1 from '@/configs/core/29.1'
import { patchCategoryOptions } from '@/configs/helpers'

export default function () {
	const categories = generateConfigCoreV29_1()

	patchCategoryOptions(categories, 'General', (options) => {
		delete options.maxorphantx

		return {
			...options,

			assumevalid: {
				...options.assumevalid,
				defaultValue: {
					mainnet: '00000000000000000000611fd22f2df7c8fbd0688745c3a6c3bb5109cc2a12cb',
					testnet3: '0000000000000065c6c38258e201971a3fdfcc2ceee0dd6e85a6c022d45dee34',
					testnet4: '000000000000000180a58e7fa3b0db84b5ea76377524894f53660d93ac839d9b',
					signet: '000000128586e26813922680309f04e1de713c7542fee86ed908f56368aefe2e',
				},
			},

			minimumchainwork: {
				...options.minimumchainwork,
				defaultValue: {
					mainnet: '0000000000000000000000000000000000000000dee8e2a309ad8a9820433c68',
					testnet3: '0000000000000000000000000000000000000000000016dd270dd94fac1d7632',
					testnet4: '00000000000000000000000000000000000000000000034a4690fe592dc49c7c',
					signet: '0000000000000000000000000000000000000000000000000000067d328e681a',
				},
			},
		}
	})

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		natpmp: {
			...options.natpmp,
			defaultValue: '1',
		},

		proxy: {
			...options.proxy,
			description:
				'Connect through &lt;ip&gt;[:&lt;port&gt;]|unix:&lt;path&gt;[=&lt;network&gt;] SOCKS5 proxy, set <a href="#noproxy">noproxy</a> to disable. May be a local file path prefixed with \'unix:\' if the proxy supports it. Could end in =network to set the proxy only for that network. The network can be any of ipv4, ipv6, tor or cjdns',
			shortDescription: 'Connect through <ip>[:<port>]|unix:<path>[=<network>] SOCKS5 proxy',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		datacarriersize: {
			...options.datacarriersize,
			description:
				'Relay and mine transactions whose data-carrying raw scriptPubKeys in aggregate are of this size or less, allowing multiple outputs',
			shortDescription:
				'Relay/mine txs whose data-carrying raw scriptPubKeys are of <n> or less bytes',
			defaultValue: '100000',
		},
	}))

	patchCategoryOptions(categories, 'RPC', (options) => ({
		...options,

		rpcallowip: {
			...options.rpcallowip,
			description:
				'Allow JSON-RPC connections from specified source. Valid are a single IP (e.g. 1.2.3.4), a network/netmask (e.g. 1.2.3.4/255.255.255.0) a network/CIDR (e.g. 1.2.3.4/24), all ipv4 (0.0.0.0/0), or all ipv6 (::/0). RFC4193 is allowed only if <a href="#cjdnsreachable">cjdnsreachable</a>=0. This option can be specified multiple times',
		},
	}))

	patchCategoryOptions(categories, 'Wallet', (options) => {
		delete options.dblogsize
		delete options.flushwallet
		delete options.privdb
		delete options.swapbdbendian

		return {
			...options,

			paytxfee: {
				...options.paytxfee,
				description: '(DEPRECATED) Fee rate (in BTC/kvB) to add to transactions you send',
			},
		}
	})

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => {
		delete options.checkpoints

		return {
			...options,

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
