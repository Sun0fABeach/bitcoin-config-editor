<script lang="ts">
	type TextConfigProps = {
		title: string
		key: string
		description: string
		value: string
	}

	const { title, key, description, value }: TextConfigProps = $props()

	let input: HTMLInputElement
	const onContainerClick = () => input.focus()
</script>

<button class="container" tabindex="-1" onclick={onContainerClick}>
	<div class="info">
		<div class="heading">
			<span>{title}</span>
			<span>{key}</span>
		</div>
		<div class="description">
			{description}
		</div>
	</div>

	<div class="input-container">
		<input bind:this={input} type="text" {value} />
		<div class="input-underline"></div>
	</div>
</button>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 0.75rem;
		padding: 0.5rem 0 0.5rem 1rem;

		@media (min-width: 420px) {
			padding: 0.5rem 1.125rem;
		}

		@media (800px <= width <= 1024px) or (min-width: calc(800px + 500px)) {
			flex-direction: row;
			align-items: flex-end;
			column-gap: 1rem;

			> .info {
				flex-grow: 1;
			}
		}

		&:hover .input-underline::after,
		&:focus-within .input-underline::after {
			width: 100%;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;

		> .heading {
			display: flex;
			align-items: baseline;
			flex-wrap: wrap;
			column-gap: 0.75rem;
			row-gap: 0.125rem;

			> :last-child {
				font-size: 0.675em;
				color: var(--color-accent1);
			}
		}

		> .description {
			font-size: 0.875em;
			text-align: left;
			color: var(--color-text-medium);
		}
	}

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
			background-color: var(--color-text-medium);

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
</style>
