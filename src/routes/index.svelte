<script context="module" lang="ts">
	import type { SerializedMeditationRecording } from '$lib/types'
	import MeditationRecording from '$lib/MeditationRecording'

	export async function load({ fetch }) {
		const res = await fetch('/meditation-recordings.json')
		const serializedMeditationRecordings: SerializedMeditationRecording[] =
			await res.json()

		MeditationRecording.sortSerialized(serializedMeditationRecordings)

		return {
			props: {
				serializedMeditationRecordings
			}
		}
	}
</script>

<script lang="ts">
	import MeditationRecordingList from '$lib/components/MeditationRecordingList.svelte'
	import SelectedRecording from '$lib/components/SelectedRecording.svelte'

	import { onMount } from 'svelte'

	export let serializedMeditationRecordings: SerializedMeditationRecording[]

	$: recordings = serializedMeditationRecordings.map(
		MeditationRecording.fromJson
	)

	let localStorageData: string
	const favoriteBeverage = 'favoriteBeverage'

	onMount(() => {
		localStorageData = localStorage.getItem(favoriteBeverage)
	})

	function updateLocalStorage() {
		localStorage.setItem(favoriteBeverage, 'Topo Chico')
		localStorageData = localStorage.getItem(favoriteBeverage)
	}
</script>

<!-- <h1 class="">Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={updateLocalStorage}>Add data to local storage</button>
{localStorageData} -->

<SelectedRecording recordingSelectedOnPageLoad={recordings[0]} />
<MeditationRecordingList {recordings} />
