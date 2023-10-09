'use client';

import { useState } from 'react';
import ChatSideBar from '../ChatSideBar';
import { Channels, DMList } from '../data/ChatData';

export default function ChatPage() {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <ChatSideBar
            messagesList={DMList}
            channelList={Channels}
            toggle={toggle}
            setToggle={setToggle}
        />
    );
}
