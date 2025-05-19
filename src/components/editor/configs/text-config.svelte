<script lang="ts">
	import ConfigContainer from '@/components/editor/configs/config-container.svelte'

	type TextConfigProps = {
		title: string
		key: string
		description: string
		value: string
	}

	let { value = $bindable(''), ...info }: TextConfigProps = $props()

	let input: HTMLInputElement
	const onContainerClick = () => input.focus()
</script>

<ConfigContainer class="text-config-container" {...info} onclick={onContainerClick}>
	<div class="input-container">
		<input bind:value bind:this={input} type="text" />
		<div class="input-underline"></div>
	</div>
</ConfigContainer>

<style lang="postcss">
	.input-container {
		display: flex;
		flex-direction: column;

		> input {
			color: var(--color-accent1);
		}

		> .input-underline {
			position: relative;
			display: flex;
			justify-content: center;
			height: 1px;
			background-color: var(--color-element-border);

			&::after {
				content: '';
				position: absolute;
				width: 0;
				height: 1px;
				background-color: var(--color-accent1);
				transition: width 0.25s;
			}
		}
	}

	:global(.text-config-container) {
		&:hover .input-underline::after,
		&:focus-within .input-underline::after {
			width: 100%;
		}
	}
</style>
