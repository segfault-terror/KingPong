import { Meta, StoryObj } from '@storybook/react';
import DirectMessage, { UserStatus } from '../app/chat/DirectMessage';

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
        status: UserStatus.Online,
    },
};
