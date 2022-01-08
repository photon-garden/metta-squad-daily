<script lang="ts">
	import type {
		MeditationRecording,
		TabOption,
		ListenedState
	} from '$lib/types'
	import type { Writable } from 'svelte/store'
	import { writable } from 'svelte/store'
	import MeditationRecordingListItem from './MeditationRecordingListItem.svelte'
	import Tabs from './tabs/Tabs.svelte'

	export let recordings: MeditationRecording[]

	$: notListenedRecordings = recordings.filter(
		(recording) => !recording.listened
	)
	$: listenedRecordings = recordings.filter((recording) => recording.listened)

	let options: TabOption<ListenedState>[]
	$: options = [
		{ text: 'All', number: recordings.length, value: 'all' },
		{ text: 'Listened', number: listenedRecordings.length, value: 'listened' },
		{
			text: 'Not listened',
			number: notListenedRecordings.length,
			value: 'notListened'
		}
	]

	const selected: Writable<TabOption<ListenedState>> = writable({
		text: 'All',
		number: recordings.length,
		value: 'all'
	})

	$: filteredRecordings = filterRecordings($selected, recordings)

	function filterRecordings(
		selected: TabOption<ListenedState>,
		recordings: MeditationRecording[]
	): MeditationRecording[] {
		switch (selected.value) {
			case 'all':
				return recordings
			case 'listened':
				return listenedRecordings
			case 'notListened':
				return notListenedRecordings
		}
	}
</script>

<Tabs {options} {selected} />
<div class="bg-white shadow overflow-hidden sm:rounded-md">
	<ul class="divide-y divide-gray-200">
		{#each filteredRecordings as recording}
			<MeditationRecordingListItem {recording} />
		{/each}
	</ul>
</div>
