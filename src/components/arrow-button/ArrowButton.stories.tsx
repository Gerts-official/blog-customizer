import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	argTypes: {
		open: { control: 'boolean' },
		onToggle: { action: 'clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	args: {
		open: false,
		onToggle: () => {
			console.log('clicked');
		},
	},
};
