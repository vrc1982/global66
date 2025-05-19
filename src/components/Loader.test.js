import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';
import Loader from './Loader.vue';

vi.mock('@/composables/useLoader', () => ({
	useLoader: () => ({
		isVisible: true,
	}),
}));

describe('Loader', () => {
	it('renders the loader when isVisible is true', () => {
		const { getByRole } = render(Loader);

		expect(getByRole('img')).toBeInTheDocument();
	});
});
