import type { Iso8601DateString } from '$lib/types'
import { Comparison } from '$lib/types'
import type { Readable, Writable } from 'svelte/store'
import { writable, get } from 'svelte/store'
import { capitalize } from './Strings'
import recordingSelectedByUser from '$lib/stores/recordingSelectedByUser'
import * as Urls from '$lib/Urls'

export default class MeditationRecording implements Readable<MeditationRecordingState> {
	static fromFilename(
		isIntro: boolean,
		filename: string
	): MeditationRecording {
		const filenameWithoutExtension = filename.split('.')[0]
		const [indexOrDateString, ...wordsInName] = filenameWithoutExtension.split('_')

		const name = wordsInName.map(capitalize).join(' ')

		let dateOrIntroIndex: Date | number
		if (isIntro) {
			const indexString = indexOrDateString
			const introIndex = Number.parseInt(indexString)
			dateOrIntroIndex = introIndex
		} else {
			const dateString = indexOrDateString
			const date = this.parseWeeklyMeditationDate(dateString)
			dateOrIntroIndex = date
		}

		return new MeditationRecording(filename, name, dateOrIntroIndex)
	}

	static parseWeeklyMeditationDate(dateString: string): Date {
		const yearString = dateString.substring(0, 0 + 4)
		const year = Number.parseInt(yearString)

		const monthString = dateString.substring(4, 4 + 2)
		// Months are zero-indexed.
		const month = Number.parseInt(monthString) - 1

		const dayString = dateString.substring(6, 6 + 2)
		const day = Number.parseInt(dayString)

		return new Date(year, month, day)
	}

	static fromJson(json: SerializedMeditationRecording): MeditationRecording {
		let dateOrIntroIndex: Date | number
		if (typeof json.dateOrIntroIndex === 'number') {
			dateOrIntroIndex = json.dateOrIntroIndex
		} else {
			dateOrIntroIndex = new Date(json.dateOrIntroIndex)
		}

		return new MeditationRecording(json.filename, json.name, dateOrIntroIndex)
	}

	static sortSerialized(recordings: SerializedMeditationRecording[]) {
		recordings.sort((a: SerializedMeditationRecording, b: SerializedMeditationRecording) => {
			const aIsIntro = typeof a.dateOrIntroIndex === 'number'
			const bIsIntro = typeof b.dateOrIntroIndex === 'number'

			// When comparing intro recordings, sort recordings with
			// a lower index first.
			if (aIsIntro && bIsIntro) {
				const aIndex = a.dateOrIntroIndex as number
				const bIndex = b.dateOrIntroIndex as number

				if (aIndex < bIndex) {
					return Comparison.LeftComesFirst
				}

				if (aIndex > bIndex) {
					return Comparison.RightComesFirst
				}

				throw new Error('Got two intro recordings with the same index.')
			}

			// When comparing weekly recordings, sort more recent
			// recordings first.
			if (!aIsIntro && !bIsIntro) {
				const aDate = new Date(a.dateOrIntroIndex as string)
				const bDate = new Date(b.dateOrIntroIndex as string)

				// A is after B.
				if (aDate > bDate) {
					return Comparison.LeftComesFirst
				}

				// A is before B.
				if (aDate < bDate) {
					return Comparison.RightComesFirst
				}

				throw new Error('Got two weekly recordings with the same date.')
			}

			// At this point, we know A and B are different types, and that
			// either A is an intro recording or B is an intro recording.
			//
			// Sort intro recordings before weekly recordings.
			if (aIsIntro && !bIsIntro) {
				return Comparison.LeftComesFirst
			}

			if (!aIsIntro && bIsIntro) {
				return Comparison.RightComesFirst
			}

			throw new Error('Somehow missed an exhaustive combination of A being an intro recording and B being an intro recording.')
		})
	}

	state: Writable<MeditationRecordingState>

	constructor(
		filename: string,
		name: string,
		dateOrIntroIndex: Date | number
	) {
		this.state = writable({
			filename: filename,
			name: name,
			dateOrIntroIndex: dateOrIntroIndex,
			listened: Math.random() < 0.5,
		})
	}

	get isIntro(): boolean {
		const $state = get(this.state)
		return typeof $state.dateOrIntroIndex === 'number'
	}

	toggleListened() {
		this.state.update($state => {
			$state.listened = !$state.listened
			return $state
		})
	}

	subscribe(run: any, invalidate: any) {
		return this.state.subscribe(run, invalidate)
	}

	markAsNextRecording() {
		recordingSelectedByUser.set(this)
	}

	get audioUrl(): string {
		const $state = get(this.state)
		if (this.isIntro) {
			return Urls.introAudioFile($state.filename)
		}

		return Urls.weeklyAudioFile($state.filename)
	}

	toJson(): SerializedMeditationRecording {
		const $state = get(this.state)

		let dateOrIntroIndex: Iso8601DateString | number
		if ($state.dateOrIntroIndex instanceof Date) {
			dateOrIntroIndex = $state.dateOrIntroIndex.toISOString()
		} else {
			dateOrIntroIndex = $state.dateOrIntroIndex
		}

		return {
			filename: $state.filename,
			dateOrIntroIndex,
			name: $state.name
		}
	}
}

export interface SerializedMeditationRecording {
	filename: string
	dateOrIntroIndex: Iso8601DateString | number
	name: string
}

export interface MeditationRecordingState {
	filename: string
	dateOrIntroIndex: Date | number
	name: string
	listened: boolean
}