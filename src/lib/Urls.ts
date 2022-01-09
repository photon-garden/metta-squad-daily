import { assets } from '$app/paths'

export function weeklyAudioFile(filename: string): string {
    return assets + '/guided-metta-meditations/' + filename
}

export function introAudioFile(filename: string): string {
    return assets + '/guided-metta-meditations/00_Introduction_to_Loving_Kindness_Series/' + filename
}

export function backgroundImage(filename: string): string {
    return assets + '/backgrounds/' + filename
}