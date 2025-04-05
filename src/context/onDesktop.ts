import { getContext, setContext } from 'svelte'
import { MediaQuery } from 'svelte/reactivity'
import { breakpoint } from '@/globals'

const key = 'onDesktop'

export function setOnDesktopContext() {
	setContext(key, new MediaQuery(`min-width: ${breakpoint}px`))
}

export function getOnDesktopContext() {
	return getContext(key) as MediaQuery
}
