<script lang="ts">
	import type { MeditationRecording } from '$lib/types'
	import * as Urls from '$lib/Urls'
	import DateOrIntroIndex from '$lib/components/DateOrIntroIndex.svelte'
	import PlayPauseButton from './PlayPauseButton.svelte'
	import recordingSelectedByUser from '$lib/stores/recordingSelectedByUser'
	import PlayProgress from './PlayProgress.svelte'
	import AudioComponent from './Audio.svelte'

	export let recordingSelectedOnPageLoad: MeditationRecording

	$: userHasSelectedARecording = $recordingSelectedByUser != null
	$: recording = userHasSelectedARecording
		? $recordingSelectedByUser
		: recordingSelectedOnPageLoad

	const backgroundImageUrl = Urls.backgroundImage('green-hill.jpg')
</script>

<AudioComponent {recording} />

<section class="mb-8" aria-labelledby="profile-overview-title">
	<div class="rounded-lg bg-white overflow-hidden shadow">
		<h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
		<div class="p-6 relative z-0 overflow-hidden">
			<img
				class="absolute pointer-events-none left-0 right-0 top-0 bottom-0 bg-cover -z-10 opacity-75"
				src={backgroundImageUrl}
				alt="Background"
			/>
			<div class="sm:flex sm:items-center sm:justify-between z-0">
				<div class="sm:flex sm:space-x-5">
					<div class="flex-shrink-0">
						<!-- <OutlinePlay classes="mx-auto h-20 w-20 scale-125 text-gray-800" /> -->
						<PlayPauseButton
							classes="block mx-auto h-20 w-20 scale-125 text-gray-900"
						/>
					</div>
					<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
						<p class="text-sm font-medium text-gray-600">
							{#if userHasSelectedARecording}
								Hello, friend. Here's what you've selected...
							{:else}
								Hello, friend. Would you like to listen to...
							{/if}
						</p>
						<p class="text-xl font-bold text-gray-900 sm:text-2xl">
							{$recording.name}
						</p>
						<p class="text-sm font-medium text-gray-600">
							<DateOrIntroIndex {recording} />
						</p>
					</div>
				</div>
				<div class="mt-5 flex justify-center sm:mt-0">
					<a
						on:click={() => {
							recording.toggleListened()
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
			<PlayProgress />
		</div>
		<div
			class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
		>
			<div class="px-6 py-5 text-sm font-medium text-center">
				<span class="text-gray-900">12</span>
				<span class="text-gray-600">Vacation days left</span>
			</div>

			<div class="px-6 py-5 text-sm font-medium text-center">
				<span class="text-gray-900">4</span>
				<span class="text-gray-600">Sick days left</span>
			</div>

			<div class="px-6 py-5 text-sm font-medium text-center">
				<span class="text-gray-900">2</span>
				<span class="text-gray-600">Personal days left</span>
			</div>
		</div>
	</div>
</section>
