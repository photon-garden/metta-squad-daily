import type { NormalizedNumber } from "$lib/types"

export function normalize(input: number, min: number, max: number): NormalizedNumber {
    const range = max - min
    const distanceFromMin = input - min
    return distanceFromMin / range
}

export function clamp(input: number, min: number, max: number): number {
    if (input < min) {
        return min
    }

    if (input > max) {
        return max
    }

    return input
}
