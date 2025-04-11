<script lang="ts">
	import { slide, fade } from 'svelte/transition'
	import { DropdownMenu, Checkbox, Label } from 'bits-ui'
	import { Check } from 'phosphor-svelte'
	import Button from '@/components/button.svelte'

	let searchDescriptions = $state(true)
	let explicitDefaults = $state(false)
	let inlineDescriptors = $state(false)

	const options = {
		get searchDescriptions() {
			return searchDescriptions
		},
		set searchDescriptions(value) {
			searchDescriptions = value
		},
		get explicitDefaults() {
			return explicitDefaults
		},
		set explicitDefaults(value) {
			explicitDefaults = value
		},
		get inlineDescriptors() {
			return inlineDescriptors
		},
		set inlineDescriptors(value) {
			inlineDescriptors = value
		},
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props}>Options</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			align="start"
			alignOffset={-15}
			sideOffset={1}
			collisionPadding={10}
			forceMount
		>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div transition:fade>
							<DropdownMenu.Arrow />
						</div>

						<div {...props} class="content" transition:slide>
							{#snippet item(key: keyof typeof options, label: string)}
								<DropdownMenu.CheckboxItem bind:checked={options[key]} closeOnSelect={false}>
									{#snippet children({ checked })}
										<div {...props} class="item">
											<Label.Root>
												{#snippet child({ props })}
													<label {...props}>
														{label}
													</label>
												{/snippet}
											</Label.Root>
											<Checkbox.Root {checked}>
												{#snippet child({ props })}
													<button {...props}>
														<Check weight="bold" color="hsl(135.29, 100%, 50%)" />
													</button>
												{/snippet}
											</Checkbox.Root>
										</div>
									{/snippet}
								</DropdownMenu.CheckboxItem>
							{/snippet}

							{@render item('searchDescriptions', 'Include descriptions in search')}
							{@render item('inlineDescriptors', 'Write inline descriptions')}
							{@render item('explicitDefaults', 'Write default values')}
						</div>
					</div>
				{/if}
			{/snippet}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

<style lang="postcss">
	.content {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		background-color: var(--color-popover-background);
		border: 1px solid var(--color-text-medium);
		border-radius: 0.375rem;
		box-shadow: 1px 1px 10px var(--color-popover-background);
		transform: translateY(-10px);
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		column-gap: 1rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;

		@media (min-width: 400px) {
			column-gap: 2rem;
		}

		&:hover {
			background-color: hsl(from green h s l / 0.3);
		}

		label {
			flex-grow: 1;
			cursor: pointer;
		}
		button {
			width: 25px;
			height: 25px;
			padding: 0;
			padding-top: 2px;
			border: 1px solid hsl(from green h s l / 0.8);
			border-radius: 0.25rem;
			background-color: var(--color-background);
			cursor: pointer;

			&[data-state='unchecked'] > :global(:first-child) {
				visibility: hidden;
			}
		}
	}
</style>
