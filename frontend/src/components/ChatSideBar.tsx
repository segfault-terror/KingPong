export default ChatSidebar;

import { BsSend } from 'react-icons/bs';
import { FaSlackHash } from 'react-icons/fa';
import { useState } from 'react';

function ChatSidebar() {
    const [currentTab, setCurrentTab] = useState(ChatTab.DirectMessages);
    const isDM = currentTab === ChatTab.DirectMessages;
    const changeTab = (tab: ChatTab) => setCurrentTab(tab);

    return (
        <>
            <button
                className="border-solid border-secondary-200 border-2 w-1/2 py-2 text-inactive-200"
                onClick={() => changeTab(ChatTab.DirectMessages)}
            >
                <BsSend
                    className={`${
                        isDM && 'text-secondary-200'
                    } w-8 h-8 mx-auto`}
                />
            </button>
            <button
                className="border-solid border-secondary-200 border-2 w-1/2 py-2 text-inactive-200"
                onClick={() => changeTab(ChatTab.Channels)}
            >
                <FaSlackHash
                    className={`${
                        !isDM && 'text-secondary-200'
                    } w-8 h-8 mx-auto`}
                />
            </button>
        </>
    );
}

export enum ChatTab {
    DirectMessages = 'Direct Messages',
    Channels = 'Channels',
}
