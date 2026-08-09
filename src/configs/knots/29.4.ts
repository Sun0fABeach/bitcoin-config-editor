import generateConfigKnotsV29_3 from '@/configs/knots/29.3'
import { patchCategoryOptions } from '@/configs/helpers'

export default function () {
	const categories = generateConfigKnotsV29_3()

	patchCategoryOptions(categories, 'Networking', (options) => ({
		...options,

		maxstaleoutbound: {
			...options.maxstaleoutbound,
			typeConstraints: {
				...options.maxstaleoutbound.typeConstraints,
				max: 10,
			},
			description:
				'Tolerate at most &lt;n&gt; automatic outbound connections to peers running stale consensus rules. These are additional to the automatic outbound target but count within the <a href="#maxconnections">maxconnections</a> limit. This limit does not apply to connections manually added via <a href="#addnode">addnode</a> or the addnode RPC. Connections to full nodes will still be sought and preferred over stale ones',
		},

		v2onlyclearnet: {
			...options.v2onlyclearnet,
			description:
				'Ensure all outbound IPv4/IPv6 peers use encrypted network traffic. Using this option requires <a href="#listen">listen</a>=0 and takes valuable listening capacity away from the network. Enable this option only if passive network observers like ISPs, firewalls, etc. pose a threat and unencrypted network traffic must be avoided. Note: Encryption protects message contents but does not obscure that you are running a Bitcoin node. Observers can still identify Bitcoin activity from your outbound connection attempts to the default port (8333) or by analysing traffic patterns.',
		},
	}))

	return categories
}
