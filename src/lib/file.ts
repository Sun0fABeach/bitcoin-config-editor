export function downloadFile(content: string) {
	const blob = new Blob([content], { type: 'text/plain' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.setAttribute('download', 'bitcoin.conf')
	link.href = url
	link.click()
}

export function uploadFile(callback: (fileContent: string) => void) {
	const input = document.createElement('input')
	input.setAttribute('type', 'file')

	input.addEventListener('change', () => {
		const files = input.files
		if (!files || files.length === 0) {
			return
		}
		const file = files[0]
		const reader = new FileReader()

		reader.onload = (e) => {
			if (!e.target || e.target.result === null) {
				alert('Could not read your file.')
				return
			}
			const contents = e.target.result as string
			const lines = contents.split(/\r\n|\n/)
			callback(lines.join('\n'))
		}
		reader.onerror = (e) => alert(`Error while loading your file:\n${e.target!.error!.name}`)

		reader.readAsText(file)
	})

	input.click()
}
