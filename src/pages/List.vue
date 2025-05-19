<template>
	<div>
		<div class="mx-auto max-w-[315px] md:max-w-[570px]">
			<div class="flex flex-col items-center min-h-screen p-4">
				<div class="relative w-full">
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Search"
						class="w-full p-4 pl-12 rounded-[5px] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-0 focus:border-transparent"
					/>
					<img src="@/assets/search.svg" class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
				</div>
				<div class="flex flex-col w-full mt-6 space-y-3 h-[calc(100vh-174px)] overflow-y-auto" @scroll="handleScroll">
					<ul v-if="visibleItems.length > 0" class="space-y-3">
						<li
							v-for="item in visibleItems"
							:key="item.name"
							class="py-2 px-6 rounded-[5px] bg-white flex justify-between items-center text-[22px] font-medium cursor-pointer"
							@click="openModal(item)"
						>
							<span>{{ capitalize(item.name) }}</span>
							<img :src="item.favorite ? star2 : star1" class="h-[44px] w-[44px] cursor-pointer" @click.stop="toggleFavorite(item)" />
						</li>
					</ul>

					<div v-else-if="!pokemonStore.isLoading && searchQuery" class="flex flex-col items-center justify-center mt-10">
						<h2 class="text-center">Uh-oh!</h2>
						<p class="text-center text-secondary text-[20px] mt-2">You look lost on your journey!</p>
						<Button class="mt-6 bg-[rgba(242,37,57,1)]" @click="goHome">Go back home</Button>
					</div>
				</div>
			</div>
		</div>

		<div class="fixed bottom-0 left-0 w-full shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
			<div class="mx-auto max-w-[315px] md:max-w-[570px]">
				<div class="flex gap-4 p-4">
					<Button
						@click="setActiveButton('all')"
						:class="activeButton === 'all' ? 'bg-[rgba(242,37,57,1)]' : 'bg-[rgba(191,191,191,1)]'"
						class="flex-1 flex items-center justify-center gap-2 rounded-[5px]"
					>
						<img src="@/assets/all.svg" class="h-5 w-5" />
						<span>All</span>
					</Button>
					<Button
						@click="setActiveButton('favorites')"
						:class="activeButton === 'favorites' ? 'bg-[rgba(242,37,57,1)]' : 'bg-[rgba(191,191,191,1)]'"
						class="flex-1 flex items-center justify-center gap-2 rounded-[5px]"
					>
						<img src="@/assets/favorites.svg" class="h-5 w-5" />
						<span>Favorites</span>
					</Button>
				</div>
			</div>
		</div>

		<Modal />
	</div>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from 'vue';
	import { useRouter } from 'vue-router';

	// Stores
	import { usePokemonStore } from '@/stores/pokemonStore';

	// Utils
	import { capitalize } from '@/utils/stringUtils';

	// Components
	import Button from '@/components/Button.vue';
	import Modal from '@/components/Modal.vue';

	// Composables
	import { useModal } from '@/composables/useModal';
	import { useLoader } from '@/composables/useLoader';

	// Assets
	import star1 from '@/assets/star1.svg';
	import star2 from '@/assets/star2.svg';

	// Constants
	const router = useRouter();
	const pokemonStore = usePokemonStore();
	const { show, hide } = useLoader();
	const { open } = useModal();
	const searchQuery = ref('');
	const visibleItems = ref([]);
	const activeButton = ref('all');
	const blockSize = 50;

	const filteredItems = computed(() => {
		if (activeButton.value === 'favorites') {
			return pokemonStore.pokemons.filter((item) => item.favorite && item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
		}
		return pokemonStore.pokemons.filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
	});

	const setActiveButton = (button) => {
		activeButton.value = button;
		resetVisibleItems();
	};

	const resetVisibleItems = () => {
		visibleItems.value = filteredItems.value.slice(0, blockSize);
	};

	const handleScroll = (event) => {
		const container = event.target;
		if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
			const currentLength = visibleItems.value.length;
			const nextItems = filteredItems.value.slice(currentLength, currentLength + blockSize);
			visibleItems.value = [...visibleItems.value, ...nextItems];
		}
	};

	const openModal = async (item) => {
		show();
		await pokemonStore.fetchPokemonDetails(item.name);

		setTimeout(() => {
			hide();
			open();
		}, 400);
	};

	const toggleFavorite = (item) => {
		item.favorite = !item.favorite;
	};

	const goHome = () => {
		show();

		setTimeout(() => {
			hide();
			router.push('/');
		}, 400);
	};

	watch(filteredItems, resetVisibleItems);

	onMounted(() => {
		resetVisibleItems();
	});
</script>
