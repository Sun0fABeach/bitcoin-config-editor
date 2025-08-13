import { coreVersions, knotsVersions, latestCoreVersion, latestKnotsVersion } from '@/lib/configs'

const options = $state({
	useKnots: true,
	coreVersion: latestCoreVersion,
	knotsVersion: latestKnotsVersion,
	showDescriptions: true,
	searchTitles: true,
	searchDescriptions: false,
	highlightKnotsExclusives: true,
	explicitDefaults: false,
	inlineDescriptors: false,
})

type Option = keyof typeof options
type StorageBool = 'true' | 'false'

const storageAvailable = typeof localStorage !== 'undefined'
const storageKey = (option: Option) => `option-${option}`
const isStorageBool = (value: string): value is StorageBool => ['true', 'false'].includes(value)
const toStorageValue = (value: string | boolean) =>
	typeof value === 'boolean' ? value.toString() : value
const fromStorageValue = (value: string) => (isStorageBool(value) ? value === 'true' : value)

function getFromStorage(option: Option) {
	if (!storageAvailable) {
		return options[option]
	}
	const value = localStorage.getItem(storageKey(option))
	return value ? fromStorageValue(value) : options[option]
}

function setInStorage(option: Option, value: string | boolean) {
	if (storageAvailable) {
		localStorage.setItem(storageKey(option), toStorageValue(value))
	}
}

export function loadOptionsFromStorage() {
	Object.keys(options).forEach((key) => {
		const option = key as Option
		;(options as Record<Option, string | boolean>)[option] = getFromStorage(option)
	})
}

let switchConfigVersionCallback: (useKnots: boolean, version: string) => Promise<boolean> = () =>
	Promise.resolve(false)
let configRefreshCallback: () => void = () => {}

export function setSwitchConfigVersionCallback(callback: typeof switchConfigVersionCallback) {
	switchConfigVersionCallback = callback
}
export function setConfigRefreshCallback(callback: typeof configRefreshCallback) {
	configRefreshCallback = callback
}

export default function () {
	return {
		coreVersions,
		knotsVersions,

		get useKnots() {
			return options.useKnots
		},
		set useKnots(value: boolean) {
			const versionType = value ? 'knotsVersion' : 'coreVersion'
			const version = getFromStorage(versionType) as string

			const switchIfConfirmed = async () => {
				if (await switchConfigVersionCallback(value, version)) {
					options.useKnots = value
					setInStorage('useKnots', value)
					options[versionType] = version
				}
			}

			switchIfConfirmed()
		},

		set coreVersion(value: string) {
			options.coreVersion = value
			setInStorage('coreVersion', value)
			switchConfigVersionCallback(options.useKnots, value)
		},

		set knotsVersion(value: string) {
			options.knotsVersion = value
			setInStorage('knotsVersion', value)
			switchConfigVersionCallback(options.useKnots, value)
		},

		get currentVersion() {
			return options[options.useKnots ? 'knotsVersion' : 'coreVersion']
		},

		get showDescriptions() {
			return options.showDescriptions
		},
		set showDescriptions(value: boolean) {
			options.showDescriptions = value
			setInStorage('showDescriptions', value)
		},

		get searchTitles() {
			return options.searchTitles
		},
		set searchTitles(value) {
			options.searchTitles = value
			setInStorage('searchTitles', value)
		},

		get searchDescriptions() {
			return options.searchDescriptions
		},
		set searchDescriptions(value) {
			options.searchDescriptions = value
			setInStorage('searchDescriptions', value)
		},

		get highlightKnotsExclusives() {
			return options.highlightKnotsExclusives
		},
		set highlightKnotsExclusives(value) {
			options.highlightKnotsExclusives = value
			setInStorage('highlightKnotsExclusives', value)
		},

		get inlineDescriptors() {
			return options.inlineDescriptors
		},
		set inlineDescriptors(value) {
			options.inlineDescriptors = value
			setInStorage('inlineDescriptors', value)
			configRefreshCallback()
		},

		get explicitDefaults() {
			return options.explicitDefaults
		},
		set explicitDefaults(value) {
			options.explicitDefaults = value
			setInStorage('explicitDefaults', value)
			configRefreshCallback()
		},
	}
}
