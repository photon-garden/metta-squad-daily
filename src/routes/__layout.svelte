<script lang="ts">
	import '../styles/tailwind-output.css'
</script>

<main class="pt-4 pb-8 bg-gray-100">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 relative">
		<nav class="relative mb-4">
			<a href="/" class="text-xl font-light text-gray-400">
				Metta Squad Daily
			</a>
			<a
				href="/about"
				class="absolute right-0 top-0 text-xl font-light text-gray-400"
			>
				About
			</a>
		</nav>

		<slot />
	</div>
</main>
