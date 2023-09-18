import { Meta, StoryObj } from '@storybook/react';
import DirectMessage from '../components/DirectMessage';

import Avatar from './assets/1.jpeg';

const meta: Meta<typeof DirectMessage> = {
    title: 'DirectMessage',
    component: DirectMessage,
};

export default meta;
type Story = StoryObj<typeof DirectMessage>;

export const Primary: Story = {
    args: {
        userName: 'Archer',
        imagePath: Avatar.src,
        lastMessage: 'Wanna play?',
    },
};
