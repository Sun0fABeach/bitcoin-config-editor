<script lang="ts">
	interface ConfigTextInputProps {
		value: string
	}

	let { value = $bindable('') }: ConfigTextInputProps = $props()

	let ref: HTMLInputElement | null = null
	export const focus = () => ref?.focus()
</script>

<div class="container">
	<input bind:value bind:this={ref} type="text" onclick={(e) => e.stopPropagation()} />
	<div class="underline"></div>
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;

		> input {
			color: var(--color-accent1);

			&:hover,
			&:focus {
				+ .underline::after {
					width: 100%;
				}
			}
		}

		> .underline {
			position: relative;
			display: flex;
			justify-content: center;
			height: 1px;
			background-color: var(--color-element-border);

			&::after {
				content: '';
				position: absolute;
				width: var(--input-highlight-underline-width, 0);
				height: 1px;
				background-color: var(--color-accent1);
				transition: width 0.25s;
			}
		}
	}
</style>
