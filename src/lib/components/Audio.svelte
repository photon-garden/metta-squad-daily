<script lang="ts">
	import type { MeditationRecording } from '$lib/types'
	import paused from '$lib/stores/paused'
	import currentTime from '$lib/stores/currentTime'
	import duration from '$lib/stores/duration'

	export let recording: MeditationRecording

	// Binding to the store directly doesn't work, probably because duration
	// is readonly.
	let localDuration: number
	$: $duration = localDuration
</script>

<audio
	class="hidden"
	src={recording.audioUrl}
	bind:currentTime={$currentTime}
	bind:duration={localDuration}
	bind:paused={$paused}
/>
