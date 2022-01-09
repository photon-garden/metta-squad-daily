import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { MeditationRecording } from '$lib/types'

const recordingSelectedByUser: Writable<MeditationRecording | null> = writable(null)

export default recordingSelectedByUser