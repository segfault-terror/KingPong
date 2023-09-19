import { Meta, StoryObj } from '@storybook/react';
import EmptyChat from '../components/EmptyChat';

const meta: Meta<typeof EmptyChat> = {
    title: 'EmptyChat',
    component: EmptyChat,
};

export default meta;
type Story = StoryObj<typeof EmptyChat>;

export const Primary: Story = {};
