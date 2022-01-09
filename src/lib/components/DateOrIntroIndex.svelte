<script lang="ts">
	import type { MeditationRecording } from '$lib/types'

	export let recording: MeditationRecording

	$: introIndex = $recording.dateOrIntroIndex as number
	$: date = $recording.dateOrIntroIndex as Date

	const dateFormattingOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
</script>

{#if recording.isIntro}
	Introduction to Loving Kindness Series #{introIndex}
{:else}
	<time datetime={date.toISOString()}>
		{date.toLocaleDateString(undefined, dateFormattingOptions)}</time
	>
{/if}
