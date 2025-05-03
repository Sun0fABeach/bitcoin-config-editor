<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Accordion } from 'bits-ui'
	import { CaretDown } from 'phosphor-svelte'

	type CategoryProps = {
		title: string
		description: string
	}

	const { title, description }: CategoryProps = $props()
</script>

<Accordion.Item value={title}>
	<Accordion.Header>
		<Accordion.Trigger>
			{#snippet child({ props })}
				<button {...props}>
					<div class="heading">
						<CaretDown class="caret" weight="duotone" />
						<h2>{title}</h2>
					</div>
					<div class="description">{description}</div>
				</button>
			{/snippet}
		</Accordion.Trigger>
	</Accordion.Header>

	<Accordion.Content forceMount={true}>
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} class="content" transition:slide>
					This is the accordion content that will transition in and out.<br />
					filler<br />
					filler<br />
					filler<br />
					filler<br />
					filler<br />
					filler<br />
					filler<br />
					filler<br />
				</div>
			{/if}
		{/snippet}
	</Accordion.Content>
</Accordion.Item>

<style lang="postcss">
	button {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		row-gap: 0.5rem;
		width: 100%;
		padding: 1.5rem 0;
		background-color: transparent;

		> .heading {
			display: flex;
			align-items: center;
			column-gap: 1rem;

			> h2 {
				font-size: 1.125em;
			}
		}

		> .description {
			color: var(--color-text-medium);
			text-align: left;
		}

		:global(.caret) {
			transition: transform 0.3s;
		}
		&[data-state='open'] :global(.caret) {
			transform: rotate(180deg);
		}

		&:hover h2 {
			transform: scale(1.1, 1.1);
		}
	}

	.content {
		padding-bottom: 1.5rem;
	}
</style>
