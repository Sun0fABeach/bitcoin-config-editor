<script lang="ts">
	import { slide, fade } from 'svelte/transition'
	import { MediaQuery } from 'svelte/reactivity'
	import { DropdownMenu, Label, useId } from 'bits-ui'
	import { GearSix } from 'phosphor-svelte'
	import Button from '@/components/buttons/button.svelte'
	import Checkbox from '@/components/checkbox.svelte'
	import useSettingsStore from '@/stores/settings.svelte'
	import { colors } from '@/globals'

	type SettingKey = keyof Pick<
		typeof settingsStore,
		| 'showDescriptions'
		| 'searchTitles'
		| 'searchDescriptions'
		| 'highlightKnotsExclusives'
		| 'inlineDescriptors'
		| 'explicitDefaults'
	>

	interface SettingsButtonProps {
		icon?: boolean
	}

	const { icon = false }: SettingsButtonProps = $props()

	const dropDownPaddingMQ = new MediaQuery('min-width: 400px')

	const settingsStore = useSettingsStore()
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger title="Settings">
		{#snippet child({ props })}
			{#if icon}
				<Button {...props} icon>
					<GearSix size={22} weight="regular" />
				</Button>
			{:else}
				<Button {...props}>Settings</Button>
			{/if}
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			align="start"
			sideOffset={1}
			collisionPadding={dropDownPaddingMQ.current ? 10 : 0}
			preventScroll={false}
			forceMount
		>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps} class="dropdown-wrapper">
						<div transition:fade>
							<DropdownMenu.Arrow />
						</div>

						<div {...props} class="content" transition:slide>
							{#snippet item(key: SettingKey, label: string)}
								<DropdownMenu.CheckboxItem bind:checked={settingsStore[key]} closeOnSelect={false}>
									{#snippet children({ checked })}
										{@const id = useId()}

										<div {...props} class="item">
											<Label.Root for={id} onclick={(e) => e.preventDefault()}>
												{#snippet child({ props })}
													<label {...props}>
														{label}
													</label>
												{/snippet}
											</Label.Root>
											<Checkbox
												{id}
												class="checkbox"
												{checked}
												backgroundColor={colors.background}
												borderColor="hsl(from green h s l / 0.8)"
											/>
										</div>
									{/snippet}
								</DropdownMenu.CheckboxItem>
							{/snippet}

							<DropdownMenu.Group>
								<DropdownMenu.GroupHeading>
									{#snippet child({ props })}
										<div {...props} class="group-heading">Editor</div>
									{/snippet}
								</DropdownMenu.GroupHeading>
								{@render item('showDescriptions', 'Show config descriptions')}
								{@render item('searchTitles', 'Include titles in search')}
								{@render item('searchDescriptions', 'Include descriptions in search')}
								{@render item('highlightKnotsExclusives', 'Highlight Knots exclusives')}
							</DropdownMenu.Group>
							<DropdownMenu.Group>
								<DropdownMenu.GroupHeading>
									{#snippet child({ props })}
										<div {...props} class="group-heading">Config Generation</div>
									{/snippet}
								</DropdownMenu.GroupHeading>
								{@render item('inlineDescriptors', 'Write inline descriptions')}
								{@render item('explicitDefaults', 'Write default values')}
							</DropdownMenu.Group>
						</div>
					</div>
				{/if}
			{/snippet}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

<style lang="postcss">
	.dropdown-wrapper {
		width: 100vw;
		min-width: initial !important; /* override bitsui style to allow text-wrap */
		font-size: 0.875em;

		@media (min-width: 400px) {
			width: initial;
			font-size: 1em;
		}
	}

	.content {
		display: flex;
		flex-flow: column;
		row-gap: 0.75rem;
		padding: 0.75rem 0.375rem 0.5rem 0.875rem;
		background-color: var(--color-popover-background);
		border: 1px solid var(--color-element-border);
		border-radius: 0.375rem;
		box-shadow: 1px 1px 10px var(--color-popover-background);
		transform: translateY(-10px);
	}

	.group-heading {
		margin-bottom: 0.25rem;
		font-weight: bold;
	}

	.item {
		display: flex;
		align-items: center;
		column-gap: 1rem;
		padding: 0.25rem 0;
		border-radius: 0.25rem;
		cursor: pointer;

		@media (min-width: 400px) {
			column-gap: 1.75rem;
			padding: 0.25rem 0.5rem 0.25rem 1.375rem;
		}

		&:hover {
			background-color: var(--color-background-highlight);
		}

		label {
			flex: 1;
			cursor: pointer;
		}
	}
</style>
