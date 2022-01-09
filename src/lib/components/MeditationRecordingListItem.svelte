<script lang="ts">
	import type { MeditationRecording } from '$lib/types'
	import DateOrIntroIndexListItemSubheading from './DateOrIntroIndexListItemSubheading.svelte'

	export let recording: MeditationRecording
</script>

<li>
	<a
		on:click={(event) => {
			recording.markAsNextRecording()
			event.preventDefault()
		}}
		href="#"
		class="block group hover:bg-gray-50"
	>
		<div class="px-4 py-4 flex items-center sm:px-6">
			<div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
				<div class="truncate">
					<div class="flex text-sm">
						<p class="font-medium text-indigo-600 truncate">
							{$recording.name}
						</p>
						<!-- <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
							in Engineering
						</p> -->
						{#if $recording.listened}
							<div class="ml-2 flex-shrink-0 flex">
								<p
									class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
								>
									Listened
								</p>
							</div>
						{/if}
					</div>
					<div class="mt-2 flex">
						<div class="flex items-center text-sm text-gray-500">
							<DateOrIntroIndexListItemSubheading {recording} />
						</div>
					</div>
				</div>
				<div
					class="group-hover:visible sm:invisible mt-4 flex-shrink-0 sm:mt-0 sm:ml-5"
				>
					<div class="flex overflow-hidden -space-x-1">
						<div class="mt-5 flex justify-center sm:mt-0">
							<a
								on:click={(event) => {
									recording.toggleListened()
									event.preventDefault()
									event.stopPropagation()
								}}
								href="#"
								class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
							>
								{#if $recording.listened}
									Mark as not listened
								{:else}
									Mark as listened
								{/if}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="ml-5 flex-shrink-0">
				<!-- Heroicon name: solid/chevron-right -->
				<svg
					class="h-5 w-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</div>
	</a>
</li>
