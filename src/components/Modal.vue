<template>
	<transition name="fade">
		<div v-if="isOpen" data-testid="modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
			<div class="bg-white rounded-[5px] shadow-lg max-w-[315px] md:max-w-[570px] w-full relative">
				<img :src="closeIcon" alt="Close" class="absolute top-4 right-4 w-[26px] h-[26px] cursor-pointer z-50" @click="close" />
				<div class="relative w-full h-[220px] bg-cover bg-center" :style="{ backgroundImage: `url(${backgroundImage})` }">
					<img
						v-if="pokemonStore.selectedPokemonDetails?.sprites?.other['official-artwork']?.front_default"
						:src="pokemonStore.selectedPokemonDetails.sprites.other['official-artwork'].front_default"
						class="absolute inset-0 m-auto w-[180px] h-[180px] object-contain"
					/>
				</div>
				<div class="py-5 px-7 pb-0">
					<p class="text-hola border-b pb-2 border-[#e8e8e8]"><strong>Name:</strong> {{ pokemonStore.selectedPokemonDetails.name }}</p>
					<p class="text-hola border-b py-2 border-[#e8e8e8]"><strong>Weight:</strong> {{ pokemonStore.selectedPokemonDetails.weight }}</p>
					<p class="text-hola border-b py-2 border-[#e8e8e8]"><strong>Height:</strong> {{ pokemonStore.selectedPokemonDetails.height }}</p>
					<p class="text-hola border-b py-2 border-[#e8e8e8]"><strong>Types:</strong> {{ pokemonStore.selectedPokemonDetails.types?.map((type) => type.type.name).join(', ') }}</p>
				</div>
				<div class="flex justify-between items-center px-7 py-5 gap-4">
					<Button class="bg-[rgba(242,37,57,1)] text-white px-4 py-2 rounded" @click="copyDetails"> Share to my friends </Button>
					<img :src="isFavorite ? star2 : star1" class="h-[44px] w-[44px] cursor-pointer" @click="toggleFavorite" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
	import { computed } from 'vue';

	// Stores
	import { usePokemonStore } from '@/stores/pokemonStore';

	// Utils
	import { copyToClipboard } from '@/utils/clipboardUtils';

	// Components
	import Button from '@/components/Button.vue';

	// Composables
	import { useModal } from '@/composables/useModal';

	// Assets
	import star1 from '@/assets/star1.svg';
	import star2 from '@/assets/star2.svg';
	import closeIcon from '@/assets/close.svg';
	import backgroundImage from '@/assets/background.png';

	// Constants
	const { isOpen, close } = useModal();
	const pokemonStore = usePokemonStore();

	const isFavorite = computed(() => {
		const selectedPokemon = pokemonStore.pokemons.find((pokemon) => pokemon.name === pokemonStore.selectedPokemonDetails?.name);
		return selectedPokemon?.favorite || false;
	});

	const toggleFavorite = () => {
		const selectedPokemon = pokemonStore.pokemons.find((pokemon) => pokemon.name === pokemonStore.selectedPokemonDetails?.name);
		if (selectedPokemon) {
			selectedPokemon.favorite = !selectedPokemon.favorite;
		}
	};

	const copyDetails = () => {
		if (pokemonStore.selectedPokemonDetails) {
			const textToCopy = `
				Name: ${pokemonStore.selectedPokemonDetails.name},
				Weight: ${pokemonStore.selectedPokemonDetails.weight},
				Height: ${pokemonStore.selectedPokemonDetails.height},
				Types: ${pokemonStore.selectedPokemonDetails.types?.map((type) => type.type.name).join(', ')}
			`
				.replace(/\s+/g, ' ')
				.trim();

			copyToClipboard(textToCopy);
		}
	};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
