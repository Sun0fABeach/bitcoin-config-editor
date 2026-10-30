import generateConfigCoreV31_1 from '@/configs/core/31.1'
import { patchCategoryOptions } from '@/configs/helpers'

export default function () {
	const categories = generateConfigCoreV31_1()

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		proxy: {
			...options.proxy,
			description:
				'Connect through &lt;ip&gt;[:&lt;port&gt;]|unix:&lt;path&gt;[=&lt;network&gt;] SOCKS5 proxy, set <a href="#noproxy">noproxy</a> to disable. May be a local file path prefixed with \'unix:\' if the proxy supports it. Could end in =network to set the proxy only for that network. The network can be any of ipv4, ipv6, onion or cjdns',
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		privatebroadcast: {
			...options.privatebroadcast,
			description:
				"EXPERIMENTAL: Broadcast transactions submitted via sendrawtransaction RPC using short-lived connections through the Tor or I2P networks, without putting them in the mempool first. This provides best-effort concealment of the transaction's origin. Transactions submitted through the wallet are not affected by this option",
		},
	}))

	return categories
}
