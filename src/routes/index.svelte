<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export async function load({ fetch }) {
		const res = await fetch('/meditation-recordings.json')
		const serializedMeditationRecordings = await res.json()

		return {
			props: {
				serializedMeditationRecordings
			}
		}
	}
</script>

<script lang="ts">
	import type MeditationRecording from '$lib/MeditationRecording'

	import { onMount } from 'svelte'

	export let serializedMeditationRecordings: MeditationRecording[]

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

<h1 class="">Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={updateLocalStorage}>Add data to local storage</button>
{localStorageData}

<ol>
	{#each serializedMeditationRecordings as recording}
		<li>
			{recording.name}
			{recording.filename}
		</li>
	{/each}
</ol>
