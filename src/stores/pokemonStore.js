import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
	state: () => ({
		isLoading: true,
		pokemons: [],
		selectedPokemonDetails: {},
	}),
	actions: {
		async fetchPokemons() {
			this.isLoading = true;
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
				const data = await response.json();
				this.pokemons = data.results.map((pokemon) => ({
					...pokemon,
					favorite: false,
				}));
			} catch (error) {
				console.error('Error al obtener los datos:', error);
			} finally {
				this.isLoading = false;
			}
		},

		async fetchPokemonDetails(name) {
			this.isLoading = true;
			try {
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
				if (!response.ok) {
					throw new Error('Failed to fetch Pokémon details');
				}
				this.selectedPokemonDetails = await response.json();
			} catch (error) {
				console.error('Error al obtener los detalles del Pokémon:', error);
				this.selectedPokemonDetails = {};
			} finally {
				this.isLoading = false;
			}
		},
	},
});
