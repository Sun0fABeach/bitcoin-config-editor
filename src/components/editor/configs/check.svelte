<script lang="ts">
	import Checkbox from '@/components/checkbox.svelte'
	import { colors } from '@/globals'

	type CheckConfigProps = {
		title: string
		key: string
		description: string
		checked: boolean
	}

	let { title, key, description, checked = $bindable(false) }: CheckConfigProps = $props()

	const onContainerClick = () => (checked = !checked)
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
		<Checkbox class="checkbox" {checked} checkmarkColor={colors.accent1} />
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
			column-gap: 1.5rem;

			> .info {
				flex-grow: 1;
			}
		}

		&:hover :global(.checkbox)::after,
		&:focus-within :global(.checkbox)::after {
			top: -1px;
			bottom: -1px;
			left: -1px;
			right: -1px;
			border-color: var(--color-accent1);
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

		> :global(.checkbox) {
			position: relative;
		}
		> :global(.checkbox):focus {
			outline: none;
		}

		:global(.checkbox)::after {
			content: '';
			position: absolute;
			top: -10px;
			bottom: -10px;
			left: -10px;
			right: -10px;
			border: 1px solid transparent;
			border-radius: 0.25rem;
			transition:
				top 0.3s,
				bottom 0.3s,
				left 0.3s,
				right 0.3s,
				border-color 0.3s;
		}
	}
</style>
