'use client';

import { useContext } from 'react';
import ChatSideBar from '../ChatSideBar';

import { ToggleContext } from '../layout';

export default function ChatPage() {
    const { toggle, setToggle } = useContext(ToggleContext);

    return <ChatSideBar toggle={toggle} setToggle={setToggle} />;
}
