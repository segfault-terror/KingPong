import { StoryObj, Meta } from '@storybook/react';
import ChatInput from '../app/chat/ChatInput';

const meta: Meta<typeof ChatInput> = {
    title: 'Chat/ChatInput',
    component: ChatInput,
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Primary: Story = {};
