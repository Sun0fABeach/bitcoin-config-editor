let search = $state('')

export default function () {
	return {
		get search() {
			return search
		},
		get normalizedSearch() {
			const trimmed = search.trim()
			return trimmed.length >= 2 ? trimmed.toLowerCase() : ''
		},
		set search(value) {
			search = value
		},
		clear() {
			search = ''
		},
	}
}
