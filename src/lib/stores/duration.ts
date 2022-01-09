import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const duration: Writable<number> = writable(1)

export default duration