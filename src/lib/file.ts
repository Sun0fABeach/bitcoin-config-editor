export function downloadFile(content: string) {
	const blob = new Blob([content], { type: 'text/plain' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.setAttribute('download', 'bitcoin.conf')
	link.href = url
	link.click()
}
