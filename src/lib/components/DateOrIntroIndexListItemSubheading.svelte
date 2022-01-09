<script lang="ts">
	import type { MeditationRecording } from '$lib/types'
	import DateOrIntroIndex from './DateOrIntroIndex.svelte'
	import HeartIcon from '$lib/components/icons/Heart.svelte'
	import CalendarIcon from '$lib/components/icons/Calendar.svelte'

	export let recording: MeditationRecording

	$: icon = recording.isIntro ? HeartIcon : CalendarIcon
</script>

<svelte:component this={icon} classes="flex-shrink-0 mr-1.5 text-gray-400" />

<p>
	<DateOrIntroIndex {recording} />
</p>
