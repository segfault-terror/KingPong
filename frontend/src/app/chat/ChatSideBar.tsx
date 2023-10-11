import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import DirectMessage from './DirectMessage';
import EmptyChat from './EmptyChat';
import ToggleButton from './ToggleButton';
import { Channels, DMList } from './data/ChatData';
import { ModalContext } from './layout';
import { AiOutlinePlusCircle } from 'react-icons/ai';

type ChatSideBarProps = {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
};

function DmList({ toggle }: ChatSideBarProps) {
    const { setNewConversation } = useContext(ModalContext);
    if (DMList.length === 0) {
        return (
            <div className="m-auto">
                <EmptyChat toggle={toggle} />
            </div>
        );
    }

    return (
        <>
            <div className="flex-grow">
                {DMList.map((message, idx) => {
                    return (
                        <>
                            <DirectMessage key={idx} {...message} />
                            {idx < DMList.length - 1 && (
                                <div className="mt-4"></div>
                            )}
                        </>
                    );
                })}
            </div>
            <div>
                <div
                    className="flex items-center justify-center
                                font-jost
                                py-2 px-4"
                >
                    <button onClick={() => setNewConversation(true)}>
                        <AiOutlinePlusCircle className="mr-2 text-4xl text-secondary-200" />
                    </button>
                    <p className="text-lg text-silver select-none">
                        Start Conversation
                    </p>
                </div>
            </div>
        </>
    );
}

function ChannelList({ toggle }: ChatSideBarProps) {
    const pathname = usePathname();
    const { setCreateChannel, setJoinChannel } = useContext(ModalContext);

    if (Channels.length === 0) {
        return (
            <div className="m-auto">
                <EmptyChat toggle={toggle} />
            </div>
        );
    }

    return (
        <>
            <div className="text-lg font-jost text-gray-300 flex-grow">
                {Channels.map((channel) => {
                    return (
                        <>
                            <Link
                                href={`/chat/channel/${channel.name}`}
                                className="block w-full text-left
                                            hover:bg-background hover:bg-opacity-80 hover:rounded-xl"
                                replace={pathname.startsWith('/chat/channel')}
                            >{`# ${channel.name}`}</Link>
                            <div className="mt-1"></div>
                        </>
                    );
                })}
            </div>
            <div
                className="flex justify-between
                    text-secondary-200 font-jost"
            >
                <button onClick={() => setJoinChannel(true)}>
                    Join channel
                </button>
                <button onClick={() => setCreateChannel(true)}>
                    Create new channel
                </button>
            </div>
        </>
    );
}

export default function ChatSideBar({ toggle, setToggle }: ChatSideBarProps) {
    return (
        <div
            className="bg-primary border-secondary-200 border-[1px]
						w-full h-full rounded-2xl py-6 px-8
						flex flex-col justify-between"
        >
            <ToggleButton toggle={toggle} setToggle={setToggle} />
            <div
                className={`flex flex-col justify-start flex-grow
                            px-4 mt-8
                            overflow-auto scrollbar-thumb-secondary-200 scrollbar-thin`}
            >
                {toggle ? (
                    <ChannelList {...{ toggle, setToggle }} />
                ) : (
                    <DmList {...{ toggle, setToggle }} />
                )}
            </div>
        </div>
    );
}
