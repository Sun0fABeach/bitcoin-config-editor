export async function writeToClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch {
		alert('No permission to write to the clipboard.')
		return false
	}
}
