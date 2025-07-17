let search = $state('')

export default function () {
	return {
		get search() {
			return search
		},
		get normalizedSearch() {
			return search.trim().toLowerCase()
		},
		set search(value) {
			search = value
		},
		clear() {
			search = ''
		},
	}
}
