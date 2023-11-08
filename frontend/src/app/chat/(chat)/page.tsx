'use client';

import { useContext } from 'react';
import ChatSideBar from '../ChatSideBar';
import { toggleContext } from '@/contexts/contexts';

export default function ChatPage() {
    const { toggle, setToggle } = useContext(toggleContext);

    return <ChatSideBar toggle={toggle} setToggle={setToggle} />;
}
