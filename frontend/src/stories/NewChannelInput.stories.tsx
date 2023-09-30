import { Meta, StoryObj } from '@storybook/react';
import Input from '../app/chat/Input';

const meta: Meta<typeof Input> = {
    title: 'Chat/Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        placeholder: 'Type a message...',
    },
};
