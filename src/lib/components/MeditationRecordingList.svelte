<script lang="ts">
	import type {
		MeditationRecording,
		MeditationRecordingState,
		TabOption,
		ListenedState
	} from '$lib/types'
	import { derived, get } from 'svelte/store'
	import type { Readable } from 'svelte/store'
	import MeditationRecordingListItem from './MeditationRecordingListItem.svelte'
	import Tabs from './tabs/Tabs.svelte'

	export let recordings: MeditationRecording[]

	const options: Readable<TabOption<ListenedState>[]> = derived(
		recordings,
		($recordings: MeditationRecordingState[]) => {
			const listenedRecordings = $recordings.filter(
				($recording) => $recording.listened
			)
			const notListenedRecordings = $recordings.filter(
				($recording) => !$recording.listened
			)

			const updatedOptions: TabOption<ListenedState>[] = [
				{ text: 'All', number: $recordings.length, value: 'all' },
				{
					text: 'Listened',
					number: listenedRecordings.length,
					value: 'listened'
				},
				{
					text: 'Not listened',
					number: notListenedRecordings.length,
					value: 'notListened'
				}
			]

			return updatedOptions
		}
	)

	let filteredRecordings = recordings

	function updateFilteredRecordings(
		event: CustomEvent<TabOption<ListenedState>>
	) {
		const selected = event.detail
		switch (selected.value) {
			case 'all':
				filteredRecordings = recordings
				break
			case 'listened':
				filteredRecordings = recordings.filter((recording) => {
					const recordingState: MeditationRecordingState = get(recording)
					return recordingState.listened
				})
				break
			case 'notListened':
				filteredRecordings = recordings.filter((recording) => {
					const recordingState: MeditationRecordingState = get(recording)
					return !recordingState.listened
				})
				break
		}
	}
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-md">
	<Tabs on:select={updateFilteredRecordings} options={$options} />
	<ul class="divide-y divide-gray-200">
		{#each filteredRecordings as recording}
			<MeditationRecordingListItem {recording} />
		{/each}
	</ul>
</div>
