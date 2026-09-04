import generateConfigKnotsV29_4 from '@/configs/knots/29.4'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigKnotsV29_4()

	patchCategoryOptions(categories, 'General', (options) => ({
		...options,

		assumevalid: {
			...options.assumevalid,
			defaultValue: {
				...(options.assumevalid.defaultValue as Record<string, string>),
				mainnet: '0000000000000078ed1e20cac1acf78df6d1060c78059fb6331e17141c881fc8',
			},
		},

		minimumchainwork: {
			...options.minimumchainwork,
			defaultValue: {
				...(options.minimumchainwork.defaultValue as Record<string, string>),
				mainnet: '00000000000000000000000000000000000000013e00277374c9f9eeadc70200',
			},
		},

		walletoldsigs: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Wallet Old Signatures',
			description:
				'Sign transactions with the legacy signature hash rather than the hardfork one, which gives up replay protection',
			shortDescription: 'Sign txs with the legacy signature hash',
			defaultValue: '0',
		},
	}))

	patchCategoryOptions(categories, 'Chain Selection', (options) => ({
		...options,

		consensusrules: {
			...options.consensusrules,
			type: EditorValueType.TEXT,
			description: 'Enforce the specified consensus rules',
			options: undefined,
		},
	}))

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		rejecttokens: {
			...options.rejecttokens,
			defaultValue: '1',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => {
		delete options.rdts_consent_flag

		return {
			...options,

			blake2b_headline: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				title: 'Blake2b Headline',
				description:
					'Specify consensus-critical proof-of-time news headline. Requires <a href="#testactivationheight">testactivationheight</a>=blake2b@&lt;height&gt;. (regtest-only)',
				shortDescription: 'Specify consensus-critical proof-of-time news headline',
			},

			checkpoints: {
				...options.checkpoints,
				description:
					'Enable rejection of any forks from the known historical chain until block 961640',
				shortDescription: 'Reject forks from the known historical chain until block 961640',
			},

			rdtsexpiry: {
				knotsExclusive: true,
				type: EditorValueType.TEXT,
				title: 'RDTS Expiry',
				description:
					'Schedule the RDTS expiry: RDTS rules apply to blocks from the blake2b activation height until the parent block\'s median-time-past reaches &lt;time&gt;. Requires <a href="#testactivationheight">testactivationheight</a>=blake2b@&lt;height&gt;. (regtest-only)',
				shortDescription: 'Schedule the RDTS expiry',
			},

			testactivationheight: {
				...options.testactivationheight,
				description:
					'Set the activation height &lt;name&gt;@&lt;height&gt;<br><br>&lt;name&gt; can be:<br>segwit, bip34, dersig, cltv, csv, blake2b<br><br>(regtest-only)',
			},
		}
	})

	return categories
}
