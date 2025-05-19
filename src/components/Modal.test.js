import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/vue';
import { ref } from 'vue';
import Modal from './Modal.vue';

const isOpen = ref(true);
const closeMock = vi.fn(() => {
	isOpen.value = false;
});

vi.mock('@/composables/useModal', () => ({
	useModal: () => ({
		isOpen,
		close: closeMock,
	}),
}));

describe('Modal', () => {
	it('displays the correct button text when the modal is open', () => {
		const { getByText } = render(Modal);

		expect(getByText('Share to my friends')).toBeInTheDocument();
	});

	it('removes the modal from the DOM when closed', async () => {
		const { getByAltText, queryByTestId } = render(Modal);

		const closeButton = getByAltText('Close');

		await fireEvent.click(closeButton);

		expect(queryByTestId('modal')).not.toBeInTheDocument();
	});
});
