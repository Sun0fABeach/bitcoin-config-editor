let showDescriptions = $state(true)
let searchTitles = $state(true)
let searchDescriptions = $state(false)
let highlightKnotsExclusives = $state(true)
let explicitDefaults = $state(false)
let inlineDescriptors = $state(false)

export default function () {
	return {
		get showDescriptions() {
			return showDescriptions
		},
		set showDescriptions(value) {
			showDescriptions = value
		},
		get searchTitles() {
			return searchTitles
		},
		set searchTitles(value) {
			searchTitles = value
		},
		get searchDescriptions() {
			return searchDescriptions
		},
		set searchDescriptions(value) {
			searchDescriptions = value
		},
		get highlightKnotsExclusives() {
			return highlightKnotsExclusives
		},
		set highlightKnotsExclusives(value) {
			highlightKnotsExclusives = value
		},
		get inlineDescriptors() {
			return inlineDescriptors
		},
		set inlineDescriptors(value) {
			inlineDescriptors = value
		},
		get explicitDefaults() {
			return explicitDefaults
		},
		set explicitDefaults(value) {
			explicitDefaults = value
		},
	}
}
