<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements'
	import KnotsLogo from '@/assets/knots-logo.png'

	type KnotsLogoProps = HTMLImgAttributes & {
		greyedOut?: boolean
	}

	const { greyedOut, ...attrs }: KnotsLogoProps = $props()
</script>

<img class={{ 'greyed-out': greyedOut }} src={KnotsLogo} alt="Knots logo" {...attrs} />

<style lang="postcss">
	img {
		transition: filter 0.6s;

		&.greyed-out {
			filter: grayscale(100%);
		}
	}
</style>
