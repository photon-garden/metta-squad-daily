<script lang="ts">
	import { onMount } from 'svelte'

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
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={updateLocalStorage}>Add data to local storage</button>
{localStorageData}
