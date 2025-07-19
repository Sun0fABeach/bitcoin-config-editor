<script lang="ts">
	import { fade } from 'svelte/transition'
	import { Select } from 'bits-ui'
	import { CaretUpDown, CaretDoubleDown, CaretDoubleUp, Check } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'
	import { unset } from '@/lib/config'
	import { EditorValueType } from '@/enums'
	import type { EditorValueSelect } from '@/types/editor'

	export interface SelectItem {
		value: EditorValueSelect
		label: string
	}

	interface ConfigSelectProps {
		open?: boolean
		value: SelectItem['value']
		items: SelectItem[]
	}

	let { open = $bindable(false), value = $bindable(), items }: ConfigSelectProps = $props()

	const shownItems = $derived.by(() => {
		if (value === unset[EditorValueType.SELECT]) {
			const placeholderItem: SelectItem = {
				value: unset[EditorValueType.SELECT],
				label: '- select -',
			}
			return [placeholderItem].concat(items)
		}
		return items
	})

	const selectedLabel = $derived(shownItems.find((option) => option.value === value)?.label)

	let triggerButton: Button | null = null
	export const focus = () => triggerButton?.focus()
</script>

<div class="wrapper">
	<Select.Root type="single" bind:value bind:open items={shownItems}>
		<Select.Trigger>
			{#snippet child({ props })}
				<Button {...props} class="trigger-button" bind:this={triggerButton}>
					<span>{selectedLabel}</span>
					<CaretUpDown />
					<div class="border-animation-horizontal"></div>
					<div class="border-animation-vertical"></div>
				</Button>
			{/snippet}
		</Select.Trigger>
		<Select.Portal>
			<Select.Content forceMount>
				{#snippet child({ wrapperProps, props, open })}
					{#if open}
						<div {...wrapperProps}>
							<div {...props} class="content" transition:fade={{ duration: 150 }}>
								<Select.ScrollUpButton>
									<CaretDoubleUp />
								</Select.ScrollUpButton>
								<Select.Viewport>
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
								</Select.Viewport>
								<Select.ScrollDownButton>
									<CaretDoubleDown />
								</Select.ScrollDownButton>
							</div>
						</div>
					{/if}
				{/snippet}
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>

<style lang="postcss">
	/* wrapper div's sole purpose is to cause tighter scoping of :global() styles */
	.wrapper {
		display: contents;

		:global(.trigger-button) {
			justify-content: space-between;
			position: relative;
			column-gap: 0.5rem;
			padding-right: 0.625rem;

			@media (800px <= width <= 1024px) or (min-width: calc(800px + 500px)) {
				width: 205px;
			}

			> :first-child {
				flex: 1;
				color: var(--color-accent1);
			}

			> .border-animation-horizontal,
			> .border-animation-vertical {
				position: absolute;
				inset: 0;

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

		:global .trigger-button:hover {
			/* remove button hover gradient */
			background: transparent;
		}
		:global .trigger-button:active {
			/* remove button press animation */
			transform: none;
		}
		:global .trigger-button:focus {
			outline: none;
		}

		:global(.trigger-button:hover),
		:global(.trigger-button:focus) {
			.border-animation-horizontal {
				&::before,
				&::after {
					width: 100%;
				}
			}
			.border-animation-vertical {
				&::before,
				&::after {
					height: 100%;
				}
			}
		}
	}

	.content {
		display: flex;
		flex-flow: column;
		width: var(--bits-select-anchor-width);
		max-height: 38vh;
		padding: 0.375rem 0.25rem;
		background-color: var(--color-popover-background);
		border: 1px solid var(--color-element-border);
		border-radius: 0.25rem;

		:global [data-select-scroll-up-button],
		:global [data-select-scroll-down-button] {
			display: flex;
			justify-content: center;
			padding: 0.25rem 0;
		}

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
				flex: none;
			}
		}
	}
</style>
