import MeditationRecording from '$lib/MeditationRecording'
import { packageDirectorySync } from 'pkg-dir'
import path from 'path'
import { readdirSync } from 'fs'

// Get the names of all the audio files for the weekly meditations.
const packageDirectory = packageDirectorySync()
const meditationsFolder = path.join(packageDirectory, 'static', 'guided-metta-meditations')
const meditationsFolderContents = readdirSync(meditationsFolder)
const weeklyMeditationFilenames = meditationsFolderContents.filter(
	filename => !filename.includes('00')
)
const weeklyMeditations = weeklyMeditationFilenames.map(filename =>
	MeditationRecording.fromFilename(false, filename)
)

// Get the names of all the audio files for intro meditations.
const introFolder = path.join(meditationsFolder, '00_Introduction_to_Loving_Kindness_Series')
const introFolderContents = readdirSync(introFolder)
const introMeditationFilenames = introFolderContents.filter(filename => filename.includes('mp3'))
const introMeditations = introMeditationFilenames.map(filename =>
	MeditationRecording.fromFilename(true, filename)
)

// Combine weekly and intro meditations.
const meditationRecordings = [...introMeditations, ...weeklyMeditations]
const serializedMeditationRecordings = meditationRecordings.map(recording => recording.toJson())

export async function get() {
	return {
		body: serializedMeditationRecordings
	}
}