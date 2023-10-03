import { createContext, useContext } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import ChatInput from './ChatInput';
import { UserStatus, getStatusColor } from './DirectMessage';

type Message = {
    isMe: boolean;
    text: string;
};

type DmConversationProps = {
    userImg: string;
    userName: string;
    userStatus: UserStatus;
    messages?: Message[];
};

type DmHeaderProps = Pick<
    DmConversationProps,
    'userImg' | 'userName' | 'userStatus'
>;

const DmContext = createContext<DmHeaderProps>({} as DmHeaderProps);

export default function DmConversation({
    userImg,
    userName,
    userStatus,
    messages,
}: DmConversationProps) {
    return (
        <div
            className="flex flex-col gap-8 h-full w-full
                        bg-primary rounded-2xl
                        bg-opacity-80
                        px-4 py-3"
        >
            <DmContext.Provider value={{ userImg, userName, userStatus }}>
                <DmConversationHeader />
            </DmContext.Provider>

            <div className="flex-grow overflow-scroll scrollbar-none">
                <DmMessageList messages={messages} />
            </div>

            <ChatInput />
        </div>
    );
}

function getStatusMsg(status: UserStatus) {
    switch (status) {
        case UserStatus.Online:
            return 'online';
        case UserStatus.Offline:
            return 'offline';
        case UserStatus.InGame:
            return 'in game';
        default:
            throw new Error('Invalid user status');
    }
}

function DmConversationHeader() {
    return (
        <div className="flex justify-between items-center">
            <UserDMInfo />
            <button>
                <HiDotsVertical className="text-secondary-200 h-8 w-8" />
            </button>
        </div>
    );
}

function UserDMInfo() {
    const { userImg, userName, userStatus } = useContext(DmContext);
    const statusColor = getStatusColor(userStatus);
    const statusMsg = getStatusMsg(userStatus);

    return (
        <div className="flex items-center gap-3">
            <img
                src={userImg}
                alt={`${userName}'s avatar`}
                className="w-16 h-16 object-cover border-[3px] border-secondary-200 rounded-full"
            />

            <div>
                <h1 className="text-white text-lg font-bold">{userName}</h1>
                <div className="flex items-center gap-1">
                    <div
                        className={`w-3 h-3 rounded-full ${statusColor}`}
                    ></div>
                    <p className="text-white text-xs">{statusMsg}</p>
                </div>
            </div>
        </div>
    );
}

type DmMessageListProps = Pick<DmConversationProps, 'messages'>;

function DmMessageList({ messages }: DmMessageListProps) {
    if (!messages) return <div className="text-white">No messages</div>;

    function generateMessage(msg: Message, idx: number) {
        const userStyles =
            'rounded-bl-xl rounded-br-xl rounded-tr-xl bg-white self-start';
        const myStyles =
            'rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-secondary-200 self-end';

        return (
            <li
                key={idx}
                className={`text-background font-mulish p-2 w-fit max-w-[80%] hyphens-auto ${
                    msg.isMe ? myStyles : userStyles
                }`}
            >
                {msg.text}
            </li>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {messages.map((msg, idx) => generateMessage(msg, idx))}
        </ul>
    );
}
