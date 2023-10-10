import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import DirectMessage, { DirectMessageProps } from './DirectMessage';
import EmptyChat from './EmptyChat';
import ToggleButton from './ToggleButton';
import { ModalContext } from './layout';

type ChatSideBarProps = {
    messagesList: DirectMessageProps[];
    channelList: string[];
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
};

type DmListProps = Omit<ChatSideBarProps, 'channelList' | 'setToggle'>;
type ChannelListProps = Omit<ChatSideBarProps, 'messagesList' | 'setToggle'>;

function DmList({ messagesList, toggle }: DmListProps) {
    if (messagesList.length === 0) {
        return (
            <div className="m-auto">
                <EmptyChat toggle={toggle} />
            </div>
        );
    }

    return (
        <>
            {messagesList.map((message, idx) => {
                return (
                    <>
                        <DirectMessage key={idx} {...message} />
                        {idx < messagesList.length - 1 && (
                            <div className="mt-4"></div>
                        )}
                    </>
                );
            })}
        </>
    );
}

function ChannelList({ channelList, toggle }: ChannelListProps) {
    const pathname = usePathname();
    const { setCreateChannel } = useContext(ModalContext);

    if (channelList.length === 0) {
        return (
            <div className="m-auto">
                <EmptyChat toggle={toggle} />
            </div>
        );
    }

    return (
        <>
            <div className="text-lg font-jost text-gray-300 flex-grow">
                {channelList.map((channel) => {
                    return (
                        <>
                            <Link
                                href={`/chat/channel/${channel}`}
                                className="hover:bg-background hover:bg-opacity-80"
                                replace={pathname.startsWith('/chat/channel')}
                            >{`# ${channel}`}</Link>
                            <div className="mt-1"></div>
                        </>
                    );
                })}
            </div>
            <div
                className="flex justify-between
                    text-secondary-200 font-jost"
            >
                <button>Join channel</button>
                <button onClick={() => setCreateChannel(true)}>
                    Create new channel
                </button>
            </div>
        </>
    );
}

export default function ChatSideBar({
    messagesList,
    channelList,
    toggle,
    setToggle,
}: ChatSideBarProps) {
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
                    <ChannelList {...{ channelList, toggle, setToggle }} />
                ) : (
                    <DmList {...{ messagesList, toggle, setToggle }} />
                )}
            </div>
        </div>
    );
}
