<script lang="ts">
	import { MagnifyingGlass } from 'phosphor-svelte'
	import Button from './button.svelte'

	const props = $props()
</script>

<Button icon title="Search config options" {...props}>
	<MagnifyingGlass size={22} weight="regular" />
</Button>
