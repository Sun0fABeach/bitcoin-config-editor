import type { CategoryDefinition } from '@/types/config-definition'

const coreConfigsImports = import.meta.glob('@/configs/core/*.json', { eager: true })
const knotsConfigsImports = import.meta.glob('@/configs/knots/*.json', { eager: true })

function extractConfigs(globImports: typeof coreConfigsImports) {
	const extracted: Record<string, CategoryDefinition[]> = {}

	for (const [path, module] of Object.entries(globImports)) {
		const version = /(\d{2}\.\d)\.json$/.exec(path)![1]
		extracted[version] = (module as { default: CategoryDefinition[] }).default
	}

	return extracted
}

export const configs = {
	core: extractConfigs(coreConfigsImports),
	knots: extractConfigs(knotsConfigsImports),
}

export const coreVersions = Object.keys(configs.core).sort().reverse()
export const knotsVersions = Object.keys(configs.knots).sort().reverse()

export const latestCoreVersion = coreVersions[0]
export const latestKnotsVersion = knotsVersions[0]
