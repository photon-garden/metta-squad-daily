<script lang="ts">
	import type { MeditationRecording } from '$lib/types'

	export let recording: MeditationRecording
	$: introIndex = recording.dateOrIntroIndex as number
	$: date = recording.dateOrIntroIndex as Date
</script>

{#if recording.isIntro}
	<svg
		class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fill-rule="evenodd"
			d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
			clip-rule="evenodd"
		/>
	</svg>
	<p>
		Introduction to Loving Kindness Series #{introIndex}
	</p>
{:else}
	<!-- Heroicon name: solid/calendar -->
	<svg
		class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path
			fill-rule="evenodd"
			d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
			clip-rule="evenodd"
		/>
	</svg>
	<p>
		<time datetime={date.toISOString()}> {date.toLocaleDateString()}</time>
	</p>
{/if}
