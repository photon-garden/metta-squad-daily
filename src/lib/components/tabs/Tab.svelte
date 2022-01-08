<script lang="ts">
	import type { TabOption } from '$lib/types'

	export let option: TabOption<any>
	export let selected: boolean
</script>

{#if selected}
	<a
		href="#"
		on:click
		class="capitalize border-indigo-500 text-indigo-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
		aria-current="page"
	>
		{option.text}

		<span
			class="bg-indigo-100 text-indigo-600 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
		>
			{option.number}
		</span>
	</a>
{:else}
	<a
		href="#"
		on:click
		class="capitalize border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
	>
		{option.text}

		<span
			class="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
		>
			{option.number}
		</span>
	</a>
{/if}
