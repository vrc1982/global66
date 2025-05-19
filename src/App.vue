<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>

	<Loader />
</template>

<script setup>
	import { onMounted } from 'vue';
	import { usePokemonStore } from '@/stores/pokemonStore';
	import Loader from '@/components/Loader.vue';

	const pokemonStore = usePokemonStore();

	onMounted(() => {
		pokemonStore.fetchPokemons();
	});
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
