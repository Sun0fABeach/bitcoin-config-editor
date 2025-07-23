let showPreview = $state(false)

export default function () {
	return {
		get showPreview() {
			return showPreview
		},
		togglePreview() {
			showPreview = !showPreview
		},
		closePreview() {
			showPreview = false
		},
		openPreview() {
			showPreview = true
		},
	}
}
