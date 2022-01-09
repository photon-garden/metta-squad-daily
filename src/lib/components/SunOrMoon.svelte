<script lang="ts">
	import SunIcon from '$lib/components/icons/Sun.svelte'
	import MoonIcon from '$lib/components/icons/Moon.svelte'

	export let classes = ''

	const hour = new Date().getHours()
	const isDaytime = hour > 6 && hour < 18
	const icon = isDaytime ? SunIcon : MoonIcon
</script>

<svelte:component this={icon} {classes} />
