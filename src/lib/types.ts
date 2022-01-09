export type Iso8601DateString = string
export type NormalizedNumber = number

export type { default as MeditationRecording, SerializedMeditationRecording, MeditationRecordingState } from './MeditationRecording'

export interface TabOption<Value> {
    text: string,
    number: number,
    value: Value,
}

export type ListenedState = 'all' | 'listened' | 'notListened'

export enum Comparison {
    LeftComesFirst = -1,
    PreserveOrder = 0,
    RightComesFirst = 1,
}

export interface AudioState {
    normalizedProgress: NormalizedNumber
    paused: boolean
}