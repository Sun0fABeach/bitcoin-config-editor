<script lang="ts">
	import { slide } from 'svelte/transition'
	import { Select } from 'bits-ui'
	import { CaretUpDown, Check } from 'phosphor-svelte'
	import ConfigContainer from '@/components/editor/configs/config-container.svelte'
	import Button from '@/components/button.svelte'

	interface SelectItem {
		value: string
		label: string
	}

	interface SelectConfigProps {
		title: string
		key: string
		description: string
		items: SelectItem[]
		value: string
	}

	let { value = $bindable(''), items, ...info }: SelectConfigProps = $props()

	let open = $state(false)

	const onContainerClick = () => (open = !open)

	/* let container handler the event */
	const onTriggerClick = (e: MouseEvent) => e.stopPropagation()

	/* let container handler the event if click outside dropdown lands on it */
	const onInteractOutsideDropdown = (e: MouseEvent) => {
		if ((e.target as HTMLElement)?.closest('.select-config-container')) {
			e.preventDefault()
		}
	}

	const selectedLabel = $derived(items.find((option) => option.value === value)?.label)
</script>

<div class="wrapper">
	<ConfigContainer class="select-config-container" {...info} onclick={onContainerClick}>
		<Select.Root type="single" bind:value bind:open {items}>
			<Select.Trigger onclick={onTriggerClick}>
				{#snippet child({ props })}
					<Button {...props} class="trigger-button">
						<span>{selectedLabel}</span>
						<CaretUpDown />
						<div class="border-animation-horizontal"></div>
						<div class="border-animation-vertical"></div>
					</Button>
				{/snippet}
			</Select.Trigger>
			<Select.Portal>
				<Select.Content forceMount onInteractOutside={onInteractOutsideDropdown}>
					{#snippet child({ wrapperProps, props, open })}
						{#if open}
							<div {...wrapperProps}>
								<div {...props} class="content" transition:slide>
									{#each items as { value, label } (value)}
										<Select.Item {value} {label}>
											{#snippet child({ props, selected })}
												<div {...props} class="item">
													<span>{label}</span>
													{#if selected}
														<Check />
													{/if}
												</div>
											{/snippet}
										</Select.Item>
									{/each}
								</div>
							</div>
						{/if}
					{/snippet}
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	</ConfigContainer>
</div>

<style lang="postcss">
	/* wrapper div's sole purpose is to cause tighter scoping of :global() styles */
	.wrapper {
		display: contents;

		:global(.trigger-button) {
			flex-shrink: 0;
			justify-content: space-between;
			position: relative;
			column-gap: 0.5rem;
			padding-right: 0.625rem;

			@media (800px <= width <= 1024px) or (min-width: calc(800px + 500px)) {
				width: 205px;
			}

			> :first-child {
				color: var(--color-accent1);
			}
			> :global(:nth-child(2)) {
				flex-shrink: 0;
			}

			> .border-animation-horizontal,
			> .border-animation-vertical {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;

				&::before,
				&::after {
					content: '';
					position: absolute;
					border-radius: 0.25rem;
					transition:
						width 0.3s,
						height 0.3s;
				}
			}

			> .border-animation-horizontal {
				&::before,
				&::after {
					width: 0;
					height: 100%;
				}
				&::before {
					top: 0;
					left: 0;
					border-top: 1px solid var(--color-accent1);
				}
				&::after {
					bottom: 0;
					right: 0;
					border-bottom: 1px solid var(--color-accent1);
				}
			}

			> .border-animation-vertical {
				&::before,
				&::after {
					width: 100%;
					height: 0;
				}
				&::before {
					bottom: 0;
					left: 0;
					border-left: 1px solid var(--color-accent1);
				}
				&::after {
					top: 0;
					right: 0;
					border-right: 1px solid var(--color-accent1);
				}
			}
		}

		:global(.trigger-button:active) {
			/* remove button press animation */
			transform: none;
		}

		:global(.select-config-container:hover .trigger-button),
		:global(.select-config-container:focus-within .trigger-button) {
			/* remove button hover gradient */
			background: transparent;

			.border-animation-horizontal::before,
			.border-animation-horizontal::after {
				width: 100%;
			}
			.border-animation-vertical::before,
			.border-animation-vertical::after {
				height: 100%;
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		width: var(--bits-select-anchor-width);
		padding: 0.375rem 0.25rem;
		background-color: var(--color-popover-background);
		border: 1px solid var(--color-element-border);
		border-radius: 0.25rem;

		.item {
			display: flex;
			justify-content: space-between;
			column-gap: 1rem;
			padding: 0.375rem 0.5rem;
			cursor: pointer;

			&[data-highlighted] {
				background-color: var(--color-background-highlight);
			}

			> :global(:nth-child(2)) {
				flex-shrink: 0;
			}
		}
	}
</style>
