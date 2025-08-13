import { coreVersions, knotsVersions, latestCoreVersion, latestKnotsVersion } from '@/lib/configs'

const settings = $state({
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

type Setting = keyof typeof settings
type StorageBool = 'true' | 'false'

const storageAvailable = typeof localStorage !== 'undefined'
const storageKey = (setting: Setting) => `setting-${setting}`
const isStorageBool = (value: string): value is StorageBool => ['true', 'false'].includes(value)
const toStorageValue = (value: string | boolean) =>
	typeof value === 'boolean' ? value.toString() : value
const fromStorageValue = (value: string) => (isStorageBool(value) ? value === 'true' : value)

function getFromStorage(setting: Setting) {
	if (!storageAvailable) {
		return settings[setting]
	}
	const value = localStorage.getItem(storageKey(setting))
	return value ? fromStorageValue(value) : settings[setting]
}

function setInStorage(setting: Setting, value: string | boolean) {
	if (storageAvailable) {
		localStorage.setItem(storageKey(setting), toStorageValue(value))
	}
}

export function loadSettingsFromStorage() {
	Object.keys(settings).forEach((key) => {
		const setting = key as Setting
		;(settings as Record<Setting, string | boolean>)[setting] = getFromStorage(setting)
	})
}

// callbacks to be handed in by the config store (pattern needed to avoid circular import)
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
			return settings.useKnots
		},
		set useKnots(value: boolean) {
			const versionType = value ? 'knotsVersion' : 'coreVersion'
			const version = getFromStorage(versionType) as string

			const switchIfConfirmed = async () => {
				if (await switchConfigVersionCallback(value, version)) {
					settings.useKnots = value
					setInStorage('useKnots', value)
					settings[versionType] = version
				}
			}

			switchIfConfirmed()
		},

		set coreVersion(value: string) {
			settings.coreVersion = value
			setInStorage('coreVersion', value)
			switchConfigVersionCallback(settings.useKnots, value)
		},

		set knotsVersion(value: string) {
			settings.knotsVersion = value
			setInStorage('knotsVersion', value)
			switchConfigVersionCallback(settings.useKnots, value)
		},

		get currentVersion() {
			return settings[settings.useKnots ? 'knotsVersion' : 'coreVersion']
		},

		get showDescriptions() {
			return settings.showDescriptions
		},
		set showDescriptions(value: boolean) {
			settings.showDescriptions = value
			setInStorage('showDescriptions', value)
		},

		get searchTitles() {
			return settings.searchTitles
		},
		set searchTitles(value) {
			settings.searchTitles = value
			setInStorage('searchTitles', value)
		},

		get searchDescriptions() {
			return settings.searchDescriptions
		},
		set searchDescriptions(value) {
			settings.searchDescriptions = value
			setInStorage('searchDescriptions', value)
		},

		get highlightKnotsExclusives() {
			return settings.highlightKnotsExclusives
		},
		set highlightKnotsExclusives(value) {
			settings.highlightKnotsExclusives = value
			setInStorage('highlightKnotsExclusives', value)
		},

		get inlineDescriptors() {
			return settings.inlineDescriptors
		},
		set inlineDescriptors(value) {
			settings.inlineDescriptors = value
			setInStorage('inlineDescriptors', value)
			configRefreshCallback()
		},

		get explicitDefaults() {
			return settings.explicitDefaults
		},
		set explicitDefaults(value) {
			settings.explicitDefaults = value
			setInStorage('explicitDefaults', value)
			configRefreshCallback()
		},
	}
}
