<script lang="ts">
	import currentTime from '$lib/stores/currentTime'
	import duration from '$lib/stores/duration'
	import type { NormalizedNumber } from '$lib/types'
	import * as Numbers from '$lib/Numbers'
	import { getRawBody } from '@sveltejs/kit/node'

	let progressBar: HTMLDivElement
	let progress: NormalizedNumber
	let dragging = false

	$: updateProgressPercent($currentTime / $duration)

	function updateProgressPercent(normalizedPlaybackProgress: NormalizedNumber) {
		if (dragging) {
			return
		}

		progress = normalizedPlaybackProgress
	}

	function startDragging(e: MouseEvent) {
		dragging = true
		updateProgress(e)
	}

	function updateProgress(e: MouseEvent) {
		if (!dragging) {
			return
		}

		const rect = progressBar.getBoundingClientRect()

		let x = Numbers.normalize(e.clientX, rect.left, rect.right)
		x = Numbers.clamp(x, 0, 1)

		progress = x
		e.preventDefault()

		document.body.classList.add('cursor-grabbing')
	}

	function stopDragging(e: MouseEvent) {
		if (!dragging) {
			return
		}

		dragging = false
		$currentTime = progress * $duration
		document.body.classList.remove('cursor-grabbing')
	}
</script>

<svelte:window on:mousemove={updateProgress} on:mouseup={stopDragging} />

<div
	class="w-full h-2 absolute bottom-0 left-0 {dragging
		? 'cursor-grabbing'
		: 'cursor-grab'}"
	on:mousedown={startDragging}
	bind:this={progressBar}
>
	<div
		id="progress-bar"
		class="bg-green-500 h-full"
		style="width: {progress * 100}%;"
	/>
</div>
