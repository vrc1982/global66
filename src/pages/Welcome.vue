<template>
	<div class="mx-auto max-w-[315px] md:max-w-[570px]">
		<div class="flex flex-col justify-center items-center min-h-screen p-4">
			<img src="@/assets/welcome.svg" class="w-[325px] aspect-[325/288]" />
			<h1 class="text-center mt-10">Welcome to Pokédex</h1>
			<p class="text-center text-secondary mt-5 font-medium max-w-full">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
			<Button class="mt-10 bg-[rgba(242,37,57,1)]" @click="goList">Get started</Button>
		</div>
	</div>
</template>

<script setup>
	import Button from '@/components/Button.vue';
	import { useLoader } from '@/composables/useLoader';
	import { useRouter } from 'vue-router';

	const { show, hide } = useLoader();
	const router = useRouter();

	function goList() {
		show();

		setTimeout(() => {
			hide();
			router.push('/list');
		}, 400);
	}
</script>
