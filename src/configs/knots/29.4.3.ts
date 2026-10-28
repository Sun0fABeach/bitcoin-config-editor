import generateConfigKnotsV29_4_2 from '@/configs/knots/29.4.2'
import { patchCategoryOptions } from '@/configs/helpers'
import { EditorValueType } from '@/enums'

export default function () {
	const categories = generateConfigKnotsV29_4_2()

	patchCategoryOptions(categories, 'Mempool', (options) => ({
		...options,

		rejectbpub: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Reject BPUB',
			description:
				'Count the witness scripts of inputs that carry a BPUB file as non-standard data carrier bytes',
			shortDescription: 'Count BPUB file data as non-standard data carrier bytes',
			defaultValue: '1',
		},

		rejectdeadbranches: {
			knotsExclusive: true,
			type: EditorValueType.CHECKBOX,
			title: 'Reject Dead Branches',
			description:
				'Count data in a conditional branch that a pushed constant makes unreachable as data carrier bytes; the OP_FALSE OP_IF envelope is counted either way',
			shortDescription: 'Count data in dead branches as data carrier bytes',
			defaultValue: '1',
		},
	}))

	patchCategoryOptions(categories, 'Mining', (options) => ({
		...options,

		blockprioritysize: {
			...options.blockprioritysize,
			description:
				'Set maximum size in bytes reserved for coin-age priority transactions meeting the mining fee floor',
			shortDescription:
				'Set max size in bytes reserved for coin-age priority txs meeting the mining fee floor',
		},
	}))

	patchCategoryOptions(categories, 'Debugging & Testing', (options) => ({
		...options,

		stalepeercommonheight: {
			knotsExclusive: true,
			type: EditorValueType.NUMBER,
			title: 'Stale Peer Common Height',
			description:
				'Set the last block shared with stale peers. Requires <a href="#testactivationheight">testactivationheight</a>=blake2b@&lt;height&gt;. (regtest-only)',
			shortDescription: 'Set the last block shared with stale peers',
		},

		testcoinbasematuritylong: {
			...options.testcoinbasematuritylong,
			description:
				'Set long coinbase maturity parameters in format &lt;start_height&gt;:&lt;enforce_height&gt;:&lt;release_height&gt;. With a set <a href="#testcoinbasematuritylongexpiry">testcoinbasematuritylongexpiry</a>, &lt;release_height&gt; - &lt;start_height&gt; sets the rolling depth and &lt;release_height&gt; does not end enforcement. Note that &lt;start_height&gt; must not be changed once used with a chainstate. (regtest-only)',
		},

		testcoinbasematuritylongexpiry: {
			knotsExclusive: true,
			type: EditorValueType.TEXT,
			title: 'Test Long Coinbase Maturity Expiry',
			description:
				'Continue the configured long coinbase maturity for rewards mined with parent MTP below this RDTS expiry, including spends after expiry. (regtest-only)',
			shortDescription: 'Continue the configured long coinbase maturity',
		},
	}))

	return categories
}
