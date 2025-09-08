<script lang="ts">
	import { fade } from 'svelte/transition'
	import { Select } from 'bits-ui'
	import { CaretUpDown, CaretDoubleDown, CaretDoubleUp, Check } from 'phosphor-svelte'
	import useSettingsStore from '@/stores/settings.svelte'
	import { coreVersions, knotsVersions } from '@/lib/configs'

	const settingsStore = useSettingsStore()

	let open = $state(false)
	let triggerHovered = $state(false)

	const currentVersion = $derived(settingsStore.currentVersion)
	const availableVersions = $derived(settingsStore.useKnots ? knotsVersions : coreVersions)
	const items = $derived(
		availableVersions.map((version) => ({
			value: version,
			label: `v${version}`,
		})),
	)

	const getVersion = () => currentVersion
	const setVersion = (newVersion: ReturnType<typeof getVersion>) => {
		settingsStore.currentVersion = newVersion
	}
</script>

<Select.Root type="single" bind:value={getVersion, setVersion} bind:open {items}>
	<Select.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="version"
				onmouseover={() => (triggerHovered = true)}
				onmouseleave={() => (triggerHovered = false)}
			>
				<span>v{currentVersion}</span>
				<CaretUpDown weight={triggerHovered || open ? 'fill' : 'duotone'} />
			</button>
		{/snippet}
	</Select.Trigger>
	<Select.Portal>
		<Select.Content forceMount sideOffset={5}>
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

<style lang="postcss">
	.version {
		display: inline flex;
		align-items: center;
		column-gap: 0.125rem;
		border-radius: 0.25rem; /* only here for rounded focus outline */
		color: var(--color-accent1);
		cursor: pointer;
	}

	.content {
		display: flex;
		flex-flow: column;
		max-height: 38vh;
		padding: 0.375rem 0.25rem;
		border: 1px solid var(--color-element-border);
		border-radius: 0.25rem;
		background-color: var(--color-popover-background);

		:global [data-select-scroll-up-button],
		:global [data-select-scroll-down-button] {
			display: flex;
			justify-content: center;
			padding: 0.25rem 0;
		}

		.item {
			display: flex;
			justify-content: space-between;
			column-gap: 0.375rem;
			padding: 0.375rem 0.375rem;
			cursor: pointer;

			&:hover {
				background-color: var(--color-background-highlight);
			}
		}
	}
</style>
