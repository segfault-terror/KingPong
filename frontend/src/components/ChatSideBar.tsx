export default ChatSidebar;

import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { FaSlackHash } from 'react-icons/fa';

function ChatSidebar() {
    const [activeTab, setActiveTab] = useState(ChatTab.DirectMessages);
    const switchToTab = (tab: ChatTab) => setActiveTab(tab);

    return (
        <>
            <div className="flex flex-row text-inactive-200">
                <div
                    className={`${
                        activeTab === ChatTab.DirectMessages &&
                        'text-secondary-200'
                    }
                                w-1/2
                                border-solid border-secondary-200 border-2
                                py-2`}
                >
                    <button
                        className="mx-auto block"
                        onClick={() => switchToTab(ChatTab.DirectMessages)}
                    >
                        <BsSend className="w-8 h-8" />
                    </button>
                </div>
                <div
                    className={`${
                        activeTab === ChatTab.Channels && 'text-secondary-200'
                    }
                                w-1/2
                                border-solid border-secondary-200 border-2
                                py-2`}
                >
                    <button
                        className="mx-auto block"
                        onClick={() => switchToTab(ChatTab.Channels)}
                    >
                        <FaSlackHash className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </>
    );
}

enum ChatTab {
    DirectMessages = 'Direct Messages',
    Channels = 'Channels',
}
