import { page } from '$app/state'

export const nodeTypeQueryParam = 'node-type'
export const versionQueryParam = 'version'
export const isKnotsQueryParamValue = 'knots'
export const isCoreQueryParamValue = 'core'

export function deeplinkOptionUrl(isKnots: boolean, version: string, hash: string) {
	const url = new URL(page.url.origin)
	url.searchParams.set(nodeTypeQueryParam, isKnots ? isKnotsQueryParamValue : isCoreQueryParamValue)
	url.searchParams.set(versionQueryParam, version)
	url.hash = hash
	return url.toString()
}

export function urlWithoutParams() {
	const url = new URL(page.url.origin)
	url.hash = page.url.hash
	return url.toString()
}
