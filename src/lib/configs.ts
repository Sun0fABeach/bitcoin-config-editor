import { uploadFile } from '@/lib/file'
import type { CategoryDefinition } from '@/types/config-definition'

type ModuleDefaultImport = () => CategoryDefinition[]
type ConfigModule = { default: ModuleDefaultImport }
type GlobImport = Record<string, ConfigModule>

const coreConfigsImports = import.meta.glob('@/configs/core/*.ts', { eager: true }) as GlobImport
const knotsConfigsImports = import.meta.glob('@/configs/knots/*.ts', { eager: true }) as GlobImport

function extractConfigs(globImports: typeof coreConfigsImports) {
	const extracted: Record<string, ModuleDefaultImport> = {}

	for (const [path, module] of Object.entries(globImports)) {
		const version = /(\d{2}\.\d)\.ts$/.exec(path)![1]
		extracted[version] = module.default
	}

	return extracted
}

export const configsGenerators = {
	core: extractConfigs(coreConfigsImports),
	knots: extractConfigs(knotsConfigsImports),
}

export const coreVersions = Object.keys(configsGenerators.core).sort().reverse()
export const knotsVersions = Object.keys(configsGenerators.knots).sort().reverse()

export const latestCoreVersion = coreVersions[0]
export const latestKnotsVersion = knotsVersions[0]

export type UploadedConfigValues = Record<string, string[]>

export async function uploadConfig() {
	const { content, fileName } = await uploadFile()

	const values = content
		.split(/\r\n|\n/)
		.map((line) => /^\s*(\w+)\s*=\s*(.+)$/.exec(line))
		.filter((match) => match)
		.reduce((result, match) => {
			const [, key, value] = match!
			if (result[key]) {
				result[key].push(value)
			} else {
				result[key] = [value]
			}
			return result
		}, {} as UploadedConfigValues)

	return { values, fileName }
}
