'use client';

import { useContext, useState } from 'react';
import ChatSideBar from '../ChatSideBar';
import { Channels, DMList } from '../data/ChatData';
import { ToggleContext } from '../layout';



export default function ChatPage() {
    const {toggle, setToggle} = useContext(ToggleContext);

    return (
        <ChatSideBar
            messagesList={DMList}
            channelList={Channels}
            toggle={toggle}
            setToggle={setToggle}
        />
    );
}
