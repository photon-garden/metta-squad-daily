export type Iso8601DateString = string

export type { SerializedMeditationRecording, default as MeditationRecording } from './MeditationRecording'

export interface TabOption<Value> {
    text: string,
    number: number,
    value: Value,
}

export type ListenedState = 'all' | 'listened' | 'notListened'