<template>
	<transition name="fade-scale">
		<div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
			<img src="@/assets/loader.svg" class="w-24 h-24 animate-spin" />
		</div>
	</transition>
</template>

<script setup>
	import { useLoader } from '@/composables/useLoader';

	const { isVisible } = useLoader();
</script>

<style scoped>
	.fade-scale-enter-active,
	.fade-scale-leave-active {
		transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
	}

	.fade-scale-enter-from,
	.fade-scale-leave-to {
		opacity: 0;
		transform: scale(0.8);
	}

	.fade-scale-enter-to,
	.fade-scale-leave-from {
		opacity: 1;
		transform: scale(1);
	}
</style>
