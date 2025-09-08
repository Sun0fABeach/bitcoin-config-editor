<script lang="ts">
	import { slide, fade } from 'svelte/transition'
	import { DropdownMenu, Button as ButtonBitsUI } from 'bits-ui'
	import { MagnifyingGlass, X } from 'phosphor-svelte'
	import useSearchStore from '@/stores/search.svelte'
	import Button from './button.svelte'

	const searchStore = useSearchStore()
	let open = $state(false)
	let inputRef = $state<HTMLInputElement | null>(null)

	const onConfirm = () => {
		open = false
	}

	const clear = () => {
		searchStore.clear()
		inputRef?.focus()
	}
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger title="Search config options">
		{#snippet child({ props })}
			<Button icon {...props}>
				<MagnifyingGlass size={22} weight="regular" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			forceMount
			align="start"
			sideOffset={1}
			preventScroll={false}
			collisionPadding={10}
			onOpenAutoFocus={(e) => e.preventDefault()}
		>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps} class="dropdown-wrapper">
						<div transition:fade>
							<DropdownMenu.Arrow />
						</div>

						<div {...props} class="content" transition:slide onintroend={() => inputRef?.focus()}>
							<input
								type="search"
								placeholder="Search"
								bind:this={inputRef}
								bind:value={searchStore.search}
								onkeypress={(e) => e.key === 'Enter' && onConfirm()}
							/>
							<ButtonBitsUI.Root
								class={['clear-button', { hidden: !searchStore.search }]}
								onclick={clear}
							>
								<X size={20} weight="bold" />
							</ButtonBitsUI.Root>
						</div>
					</div>
				{/if}
			{/snippet}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

<style lang="postcss">
	.dropdown-wrapper {
		> .content {
			display: flex;
			align-items: center;
			width: 90vw;
			height: 2.125rem;
			padding-left: 0.5rem;
			background-color: var(--color-background);
			border: 1px solid var(--color-element-border);
			border-radius: 0.375rem;
			box-shadow: var(--box-shadow-popover);
			transform: translateY(-10px);

			@media (min-width: 350px) {
				width: 16rem;
			}

			> input {
				width: 0; /* reset browser defined width */
				flex: 1;
				font-size: 1.25rem;

				&::placeholder {
					color: var(--color-text-medium);
				}
			}

			:global > .clear-button {
				display: inline flex;
				padding: 0.375rem 0.5rem 0.375rem 0.375rem;
			}
			:global > .clear-button.hidden {
				display: none;
			}
		}
	}
</style>
