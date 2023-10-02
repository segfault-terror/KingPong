import { Meta, StoryObj } from '@storybook/react';
import ChatSideBar from '../app/chat/ChatSideBar';
import { UserStatus } from '../app/chat/DirectMessage';

import Tommy from './assets/1.jpeg';
import { useState } from 'react';

const meta: Meta<typeof ChatSideBar> = {
    title: 'Chat/ChatSideBar',
    component: ChatSideBar,
};

export default meta;
type Story = StoryObj<typeof ChatSideBar>;



export const Primary: Story = {
    render: (args) => {
        return (
            <ChatSideBar {...args} />
            );
        },
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
        channelList: ['segfault_terror', 'fc_mota9a3idin'],
        toggle: false,
        setToggle: (toggle: boolean) => {},
    },
};
