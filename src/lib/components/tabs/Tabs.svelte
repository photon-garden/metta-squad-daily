<script lang="ts">
	import type { TabOption } from '$lib/types'
	import type { Writable } from 'svelte/store'
	import { writable } from 'svelte/store'
	import Tab from './Tab.svelte'

	export let options: TabOption<any>[]
	export let selected: Writable<TabOption<any>> = writable(options[0])

	function select(option: TabOption<any>) {
		return () => {
			$selected = option
		}
	}
</script>

<div>
	<div class="sm:hidden">
		<label for="tabs" class="sr-only">Select a tab</label>
		<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
		<select
			id="tabs"
			name="tabs"
			class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
		>
			{#each options as option}
				<option on:select={select(option)}>{option.text}</option>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex space-x-8" aria-label="Tabs">
				<!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" -->
				{#each options as option}
					<Tab
						{option}
						selected={option === $selected}
						on:click={select(option)}
					/>
				{/each}
			</nav>
		</div>
	</div>
</div>
