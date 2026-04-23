<script lang="ts">
	import { fade } from 'svelte/transition'
	import { Select } from 'bits-ui'
	import { CaretUpDown, CaretDoubleDown, CaretDoubleUp, Check } from 'phosphor-svelte'
	import Button from '@/components/buttons/button.svelte'
	import KnotsLogo from '@/components/knots-logo.svelte'
	import useSettingsStore from '@/stores/settings.svelte'
	import { colors } from '@/globals'
	import type { CategoryDefinition } from '@/types/config-definition'

	export interface SelectItem {
		value: CategoryDefinition['title']
		label: CategoryDefinition['title']
		description: CategoryDefinition['description']
		knotsExclusive: CategoryDefinition['knotsExclusive']
	}

	interface CategorySelectProps {
		value: SelectItem['value']
		items: SelectItem[]
	}

	let { value = $bindable(), items }: CategorySelectProps = $props()

	const selectedItem = $derived(items.find((item) => item.value === value)!)

	let open = $state(false)
	let triggerHovered = $state(false)

	const settingsStore = useSettingsStore()

	const showKnotsExclusivity = $derived(settingsStore.highlightKnotsExclusives)
</script>

<div class="wrapper">
	<Select.Root type="single" bind:value bind:open {items}>
		<Select.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					class="trigger-button"
					onmouseover={() => (triggerHovered = true)}
					onmouseleave={() => (triggerHovered = false)}
				>
					<div>
						<span class="trigger-button-title">
							{selectedItem.label}
							{#if selectedItem.knotsExclusive && showKnotsExclusivity}
								<KnotsLogo alt="Knots exclusive" title="Knots exclusive" />
							{/if}
						</span>
						<span class="trigger-button-description">{selectedItem.description}</span>
					</div>
					<CaretUpDown
						size={24}
						color={colors.accent1}
						weight={triggerHovered || open ? 'fill' : 'duotone'}
					/>
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
									{#each items as { value, label, knotsExclusive } (value)}
										<Select.Item {value} {label}>
											{#snippet child({ props, selected })}
												<div {...props} class="item">
													<div>
														<span>{label}</span>
														{#if knotsExclusive && showKnotsExclusivity}
															<KnotsLogo alt="Knots exclusive" title="Knots exclusive" />
														{/if}
													</div>
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
			width: 100%;
			column-gap: 0.75rem;
			padding-top: 0.75rem;
			padding-bottom: 0.75rem;
			border-top: none;
			border-left: none;
			border-right-color: transparent;
			border-radius: 0;

			@media (min-width: 1024px) {
				border-right-color: var(--border-color-dark);
				border-bottom-left-radius: 0.25rem;
				border-bottom-right-radius: 0.25rem;
			}

			:global &.bce-button:active {
				/* prevent button component toggle anim */
				transform: none;
				@media (min-width: 1024px) {
					border-right-color: var(--border-color-light);
				}
			}

			> :first-child {
				flex-grow: 1;
				display: flex;
				flex-flow: column;
				row-gap: 0.25rem;

				> .trigger-button-title {
					display: inline flex;
					justify-content: center;
					align-items: center;
					column-gap: 0.5rem;

					:global > img {
						height: 1.375rem;
					}
				}
				> .trigger-button-description {
					color: var(--color-text-medium);
					font-size: 1rem;
					@media (min-width: 600px) {
						font-size: 1.125rem;
					}
				}
			}

			:global > :last-child {
				flex-shrink: 0;
			}
		}
	}

	.content {
		display: flex;
		flex-flow: column;
		width: var(--bits-select-anchor-width);
		max-height: 50vh;
		padding: 0.375rem 0.25rem;
		border: 1px solid var(--color-element-border);
		border-radius: 0.25rem;
		background-color: var(--color-popover-background);
		font-size: 1.125em;

		:global [data-select-scroll-up-button],
		:global [data-select-scroll-down-button] {
			display: flex;
			justify-content: center;
			padding: 0.25rem 0;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			column-gap: 1rem;
			padding: 0.5rem 0.5rem;
			cursor: pointer;

			@media (min-width: 500px) {
				justify-content: start;
			}

			&[data-highlighted] {
				background-color: var(--color-background-highlight);
			}

			> div {
				display: flex;
				justify-content: space-between;
				align-items: center;
				column-gap: 0.75rem;

				:global > :nth-child(2) {
					height: 1.375rem;
				}
			}
		}
	}
</style>
