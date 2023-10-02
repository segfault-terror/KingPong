import DirectMessage, { UserStatus } from './DirectMessage';
import ToggleButton from './ToggleButton';
import { DirectMessageProps } from './DirectMessage';
import EmptyChat from './EmptyChat';
import { type } from 'os';

type ChatSideBarProps = {
    messagesList: DirectMessageProps[];
    channelList: string[];
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
};

type DmListProps = Omit<ChatSideBarProps, 'channelList'>;
type ChannelListProps = Omit<ChatSideBarProps, 'messagesList'>;

function DmList({ messagesList, toggle, setToggle }: DmListProps) {
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

function ChannelList({ channelList, toggle, setToggle }: ChannelListProps) {
    if (channelList.length === 0) {
        return (
            <div className="m-auto">
                <EmptyChat toggle={toggle} />
            </div>
        );
    }

    return (
        <>
            <div className="text-lg font-jost text-gray-300">
                {channelList.map((channel, idx) => {
                    return (
                        <>
                            {`# ${channel}`}
                            {idx < channelList.length - 1 && <br />}
                        </>
                    );
                })}
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
            className="bg-primary bg-opacity-80
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
