<script lang="ts">
	import type { TabOption } from '$lib/types'
	import { createEventDispatcher } from 'svelte'
	import Tab from './Tab.svelte'

	const dispatch = createEventDispatcher()

	export let options: TabOption<any>[]
	export let selectedValue: any = options[0].value
	export let classes = ''

	function select(option: TabOption<any>) {
		selectedValue = option.value
		dispatch('select', option)
	}

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement

		const selectedOption = options.find(
			(option) => option.value === target.value
		)

		select(selectedOption)
	}
</script>

<div class={classes}>
	<div class="sm:hidden">
		<label for="tabs" class="sr-only">Select a tab</label>
		<select
			id="tabs"
			name="tabs"
			class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
			on:change={handleChange}
		>
			{#each options as option}
				<option selected={option.value === selectedValue} value={option.value}>
					{option.text}
				</option>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex space-x-8" aria-label="Tabs">
				{#each options as option}
					<Tab
						{option}
						selected={option.value === selectedValue}
						on:click={() => select(option)}
					/>
				{/each}
			</nav>
		</div>
	</div>
</div>
