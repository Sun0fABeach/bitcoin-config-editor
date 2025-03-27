import { sampleConfigText } from '@/globals'

let textContent = $state(sampleConfigText)
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

		get textContent() {
			return textContent
		},
		set textContent(newContent) {
			textContent = newContent
		},
	}
}
