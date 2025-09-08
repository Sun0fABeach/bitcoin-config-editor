import { page } from '$app/state'
import { goto } from '$app/navigation'
import { browser } from '$app/environment'
import {
	nodeTypeQueryParam,
	versionQueryParam,
	isKnotsQueryParamValue,
	isCoreQueryParamValue,
	urlWithoutParams,
} from '@/lib/url'
import { coreVersions, knotsVersions, latestCoreVersion, latestKnotsVersion } from '@/lib/configs'

const useKnotsKey = 'useKnots'
const nodeVersionKeyCore = 'coreVersion'
const nodeVersionKeyKnots = 'knotsVersion'
const showDescriptionsKey = 'showDescriptions'
const searchTitlesKey = 'searchTitles'
const searchDescriptionsKey = 'searchDescriptions'
const highlightKnotsExclusivesKey = 'highlightKnotsExclusives'
const explicitDefaultsKey = 'explicitDefaults'
const inlineDescriptorsKey = 'inlineDescriptors'

const settings = $state({
	[useKnotsKey]: true,
	[nodeVersionKeyCore]: latestCoreVersion,
	[nodeVersionKeyKnots]: latestKnotsVersion,
	[showDescriptionsKey]: true,
	[searchTitlesKey]: true,
	[searchDescriptionsKey]: false,
	[highlightKnotsExclusivesKey]: true,
	[explicitDefaultsKey]: false,
	[inlineDescriptorsKey]: false,
})

const getNodeVersionKey = (isKnots: boolean) => (isKnots ? nodeVersionKeyKnots : nodeVersionKeyCore)

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

export function loadSettings() {
	loadSettingsFromStorage()
	if (browser) {
		syncSettingsWithQueryParams()
	}
}

function loadSettingsFromStorage() {
	Object.keys(settings).forEach((key) => {
		const setting = key as Setting
		;(settings as Record<Setting, string | boolean>)[setting] = getFromStorage(setting)
	})
}

function syncSettingsWithQueryParams() {
	const searchParams = page.url.searchParams

	const nodeType = searchParams.get(nodeTypeQueryParam) || ''
	if ([isCoreQueryParamValue, isKnotsQueryParamValue].includes(nodeType)) {
		const useKnots = nodeType === isKnotsQueryParamValue
		settings[useKnotsKey] = useKnots
		setInStorage(useKnotsKey, useKnots)
	}

	const version = searchParams.get(versionQueryParam) || ''
	if (version) {
		if (settings.useKnots) {
			if (knotsVersions.includes(version)) {
				settings[nodeVersionKeyKnots] = version
				setInStorage(nodeVersionKeyKnots, version)
			}
		} else {
			if (coreVersions.includes(version)) {
				settings[nodeVersionKeyCore] = version
				setInStorage(nodeVersionKeyCore, version)
			}
		}
	}

	goto(urlWithoutParams())
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
			return settings[useKnotsKey]
		},
		set useKnots(value: boolean) {
			const versionType = getNodeVersionKey(value)
			const version = getFromStorage(versionType) as string

			const switchIfConfirmed = async () => {
				if (await switchConfigVersionCallback(value, version)) {
					settings[useKnotsKey] = value
					setInStorage(useKnotsKey, value)
					settings[versionType] = version
				}
			}

			switchIfConfirmed()
		},

		set coreVersion(value: string) {
			const switchIfConfirmed = async () => {
				if (await switchConfigVersionCallback(false, value)) {
					settings[nodeVersionKeyCore] = value
					setInStorage(nodeVersionKeyCore, value)
				}
			}

			switchIfConfirmed()
		},

		set knotsVersion(value: string) {
			const switchIfConfirmed = async () => {
				if (await switchConfigVersionCallback(true, value)) {
					settings[nodeVersionKeyKnots] = value
					setInStorage(nodeVersionKeyKnots, value)
				}
			}

			switchIfConfirmed()
		},

		get currentVersion() {
			return settings[getNodeVersionKey(settings[useKnotsKey])]
		},

		set currentVersion(value: string) {
			this[getNodeVersionKey(settings[useKnotsKey])] = value
		},

		get showDescriptions() {
			return settings[showDescriptionsKey]
		},
		set showDescriptions(value: boolean) {
			settings[showDescriptionsKey] = value
			setInStorage(showDescriptionsKey, value)
		},

		get searchTitles() {
			return settings[searchTitlesKey]
		},
		set searchTitles(value) {
			settings[searchTitlesKey] = value
			setInStorage(searchTitlesKey, value)
		},

		get searchDescriptions() {
			return settings[searchDescriptionsKey]
		},
		set searchDescriptions(value) {
			settings[searchDescriptionsKey] = value
			setInStorage(searchDescriptionsKey, value)
		},

		get highlightKnotsExclusives() {
			return settings[highlightKnotsExclusivesKey]
		},
		set highlightKnotsExclusives(value) {
			settings[highlightKnotsExclusivesKey] = value
			setInStorage(highlightKnotsExclusivesKey, value)
		},

		get inlineDescriptors() {
			return settings[inlineDescriptorsKey]
		},
		set inlineDescriptors(value) {
			settings[inlineDescriptorsKey] = value
			setInStorage(inlineDescriptorsKey, value)
			configRefreshCallback()
		},

		get explicitDefaults() {
			return settings[explicitDefaultsKey]
		},
		set explicitDefaults(value) {
			settings[explicitDefaultsKey] = value
			setInStorage(explicitDefaultsKey, value)
			configRefreshCallback()
		},
	}
}
