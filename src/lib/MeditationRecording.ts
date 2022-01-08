import type { Iso8601DateString } from './types'
import { capitalize } from './Strings'

export default class MeditationRecording {
	filename: string
	dateOrIntroIndex: Date | number
	name: string

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

	constructor(
		filename: string,
		name: string,
		dateOrIntroIndex: Date | number
	) {
		this.filename = filename
		this.name = name
		this.dateOrIntroIndex = dateOrIntroIndex
	}

	get isIntro(): boolean {
		return typeof this.dateOrIntroIndex === 'number'
	}

	get listened(): boolean {
		return Math.random() < 0.5
	}

	toJson(): SerializedMeditationRecording {
		let dateOrIntroIndex: Iso8601DateString | number
		if (this.dateOrIntroIndex instanceof Date) {
			dateOrIntroIndex = this.dateOrIntroIndex.toISOString()
		} else {
			dateOrIntroIndex = this.dateOrIntroIndex
		}

		return {
			filename: this.filename,
			dateOrIntroIndex,
			name: this.name
		}
	}
}

export interface SerializedMeditationRecording {
	filename: string
	dateOrIntroIndex: Iso8601DateString | number
	name: string
}
