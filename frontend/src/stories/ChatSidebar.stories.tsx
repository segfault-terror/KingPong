import { Meta, StoryObj } from '@storybook/react';
import ChatSideBar from '../app/chat/ChatSideBar';
import { UserStatus } from '../app/chat/DirectMessage';

import Tommy from './assets/1.jpeg';

const meta: Meta<typeof ChatSideBar> = {
    title: 'Chat/ChatSideBar',
    component: ChatSideBar,
};

export default meta;
type Story = StoryObj<typeof ChatSideBar>;

export const Primary: Story = {
    render: (args) => (
            <ChatSideBar {...args} />
    ),
    args: {
        messagesList: [
            {
                userName: 'Tommy',
                imagePath: Tommy.src,
                lastMessage: 'Hello',
                status: UserStatus.Online,
            },
            {
                userName: 'Tommy',
                imagePath: Tommy.src,
                lastMessage: 'Hello',
                status: UserStatus.Offline,
            },
            {
                userName: 'Tommy',
                imagePath: Tommy.src,
                lastMessage: 'Hello',
                status: UserStatus.InGame,
            },
            {
                userName: 'Tommy',
                imagePath: Tommy.src,
                lastMessage: 'Hello',
                status: UserStatus.InGame,
            },
            {
                userName: 'Tommy',
                imagePath: Tommy.src,
                lastMessage: 'Hello',
                status: UserStatus.InGame,
            },
            {
                userName: 'Tommy',
                imagePath: Tommy.src,
                lastMessage: 'Hello',
                status: UserStatus.InGame,
            },
        ],
    },
};
