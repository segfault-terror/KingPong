'use client';
import { useState } from 'react';
import ToggleButton from './ToggleButton';
import ChatSideBar from './ChatSideBar';
import { UserStatus } from './DirectMessage';

export default function ChatPage() {
    const [toggle, setToggle] = useState<boolean>(false);

    const messagesList = [
        {
            userName: 'Tommy',
            imagePath: '/images/1.jpeg',
            lastMessage: 'Hello',
            status: UserStatus.Online,
        },
        {
            userName: 'Tommy',
            imagePath: '/images/1.jpeg',
            lastMessage: 'Hello',
            status: UserStatus.Offline,
        },
        {
            userName: 'Tommy',
            imagePath: '/images/1.jpeg',
            lastMessage: 'Hello',
            status: UserStatus.InGame,
        },
    ];

    const channelList = ['segfault_terror', 'fc_mota9a3idin',
                        'segfault_terror', 'fc_mota9a3idin', 'segfault_terror',
                        'fc_mota9a3idin', 'segfault_terror', 'fc_mota9a3idin',
                        'fc_mota9a3idin', 'segfault_terror', 'fc_mota9a3idin',];
    return (
        <div className='py-8 px-4 h-screen bg-background'>
            <ChatSideBar
                messagesList={messagesList}
                channelList={channelList}
                toggle={toggle}
                setToggle={setToggle}
            />
        </div>
    );
}
