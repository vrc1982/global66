import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import Button from './Button.vue';

describe('Button', () => {
	it('renders the button with the correct slot content', () => {
		const { getByText } = render(Button, {
			slots: {
				default: 'Click Me',
			},
		});

		expect(getByText('Click Me')).toBeInTheDocument();
	});

	it('emits a click event when clicked', async () => {
		const onClick = vi.fn();
		const { getByRole } = render(Button, {
			attrs: {
				onClick,
			},
			slots: {
				default: 'Click Me',
			},
		});

		const button = getByRole('button');
		await fireEvent.click(button);

		expect(onClick).toHaveBeenCalled();
	});
});
