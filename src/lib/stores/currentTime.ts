import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const currentTime: Writable<number> = writable(0)

export default currentTime