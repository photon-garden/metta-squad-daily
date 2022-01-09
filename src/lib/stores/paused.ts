import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const paused: Writable<boolean> = writable(true)

export default paused