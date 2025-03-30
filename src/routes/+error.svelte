<script lang="ts">
	import { page } from '$app/state'
</script>

<h1>{page.status}: {page.error!.message}</h1>

<style lang="postcss">
	h1 {
		padding: 0 2rem;
	}
</style>
