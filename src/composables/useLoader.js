import { ref } from 'vue';

const isVisible = ref(false);

export function useLoader() {
	return {
		isVisible,
		show: () => (isVisible.value = true),
		hide: () => (isVisible.value = false),
	};
}
