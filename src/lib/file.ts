export function downloadFile(content: string) {
	const blob = new Blob([content], { type: 'text/plain' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.setAttribute('download', 'bitcoin.conf')
	link.href = url
	link.click()
}

export function uploadFile(): Promise<{ content: string; fileName: string }> {
	return new Promise((resolve, reject) => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')

		input.addEventListener('change', () => {
			const files = input.files
			if (!files || files.length === 0) {
				return
			}
			const file = files[0]
			const fileName = file.name
			const reader = new FileReader()
			reader.readAsText(file)

			reader.onload = (e) => {
				if (!e.target || e.target.result === null) {
					reject(`Could not read file: ${fileName}`)
					return
				}
				const content = e.target.result as string
				resolve({ content, fileName })
			}
			reader.onerror = () => reject(`Could not load file: ${fileName}`)
		})

		input.click()
	})
}
