const options = $state({
	useKnots: true,
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
const toStorageBool = (value: boolean) => value.toString() as StorageBool
const fromStorageBool = (value: StorageBool) => value === 'true'

function getFromStorage(option: Option) {
	if (!storageAvailable) {
		return options[option]
	}
	const value = localStorage.getItem(storageKey(option))
	return value ? fromStorageBool(value as StorageBool) : options[option]
}

function setInStorage(option: Option, value: boolean) {
	if (storageAvailable) {
		localStorage.setItem(storageKey(option), toStorageBool(value))
	}
}

export function loadOptionsFromStorage() {
	Object.keys(options).forEach((key) => {
		options[key as Option] = getFromStorage(key as Option)
	})
}

const optionsProxy = {
	get useKnots() {
		return options.useKnots
	},
	set useKnots(value: boolean) {
		options.useKnots = value
		setInStorage('useKnots', value)
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

export default function () {
	return optionsProxy
}

let configRefreshCallback = () => {}

export function setConfigRefreshCallback(callback: () => void) {
	configRefreshCallback = callback
}
