import { onMount } from 'svelte'

/* usable for elements that are not supposed to have certain styles (mainly visibility)
   before hydration in the browser is finished */

export default function (timeout = 0) {
	let visibilityGuard = $state(true)
	onMount(() => setTimeout(() => (visibilityGuard = false), timeout))

	return {
		get flag() {
			return visibilityGuard
		},
	}
}
