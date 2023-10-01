import { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '../app/chat/ToggleButton';

const meta: Meta<typeof ToggleButton> = {
    title: 'Chat/ToggleButton',
    component: ToggleButton,
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Primary: Story = {
    render: (args) => (
            <ToggleButton />
    ),
};
