import generateConfigKnotsV29_4_1 from '@/configs/knots/29.4.1'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigKnotsV29_4_1()

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		v2onlyclearnet: {
			...options.v2onlyclearnet,
			description:
				'Require v2 transport (BIP324) for connections with IPv4/IPv6 peers. Outbound connections to v1-only clearnet peers are not attempted and inbound v1 connections from clearnet peers are disconnected. Tor/I2P/CJDNS peers are unaffected, being encrypted already. Requires <a href="#v2transport">v2transport</a>=1. Enable this only if passive on-path observers such as your ISP are a concern. Note: this encrypts message contents; it does not hide that you are running a Bitcoin node, which the default port (8333) and traffic patterns still reveal',
			shortDescription: 'Require v2 transport (BIP324) for connections with IPv4/IPv6 peers',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => ({
		...options,

		testcoinbasematuritylong: {
			knotsExclusive: true,
			type: EditorValueType.TEXT,
			title: 'Test Long Coinbase Maturity',
			description:
				'Set long coinbase maturity parameters in format &lt;start_height&gt;:&lt;enforce_height&gt;:&lt;release_height&gt;. Note that &lt;start_height&gt; must not be changed once used with a chainstate. (regtest-only)',
			shortDescription: 'Set long coinbase maturity parameters',
		},
	}))

	return categories
}
