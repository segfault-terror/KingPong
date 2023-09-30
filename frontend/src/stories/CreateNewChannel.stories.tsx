import { Meta, StoryObj } from '@storybook/react';
import CreateNewChannel from '../app/chat/CreateNewChannel';

const meta: Meta<typeof CreateNewChannel> = {
    title: 'chat/CreateNewChannel',
    component: CreateNewChannel,
};

export default meta;
type Story = StoryObj<typeof CreateNewChannel>;

export const Primary: Story = {};
