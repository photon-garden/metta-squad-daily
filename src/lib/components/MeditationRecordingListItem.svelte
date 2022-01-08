<script lang="ts">
	import type { MeditationRecording } from '$lib/types'
	import DateOrIntroIndex from './DateOrIntroIndex.svelte'

	export let recording: MeditationRecording
</script>

<li>
	<a href="#" class="block hover:bg-gray-50">
		<div class="px-4 py-4 flex items-center sm:px-6">
			<div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
				<div class="truncate">
					<div class="flex text-sm">
						<p class="font-medium text-indigo-600 truncate">
							{recording.name}
						</p>
						<!-- <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
							in Engineering
						</p> -->
						{#if recording.listened}
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
							<DateOrIntroIndex {recording} />
						</div>
					</div>
				</div>
				<div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
					<div class="flex overflow-hidden -space-x-1">
						<img
							class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="Dries Vincent"
						/>

						<img
							class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="Lindsay Walton"
						/>

						<img
							class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="Courtney Henry"
						/>

						<img
							class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="Tom Cook"
						/>
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
