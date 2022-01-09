<script lang="ts">
	import OutlinePlay from './icons/OutlinePlay.svelte'
	import OutlinePause from './icons/OutlinePause.svelte'
	import paused from '$lib/stores/paused'

	export let classes = ''

	function togglePaused() {
		$paused = !$paused
	}
</script>

<button on:click={togglePaused} class={classes}>
	{#if $paused}
		<OutlinePlay classes="w-full h-full" />
	{:else}
		<OutlinePause classes="w-full h-full" />
	{/if}
</button>
