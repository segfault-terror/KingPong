'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import ChatInput from './ChatInput';
import { UserStatus, getStatusColor } from './DirectMessage';
import { DMConversations } from './data/ChatData';
import { ModalContext } from './layout';

type Message = {
    isMe: boolean;
    text: string;
};

export type DmConversationProps = {
    userName: string;
};

export default function DmConversation({ userName }: DmConversationProps) {
    return (
        <div
            className="flex flex-col gap-8 h-full
                bg-primary
                rounded-2xl
                px-4 py-3
                border-secondary-200 border-[1px]"
        >
            <DmConversationHeader userName={userName} />
            <div className="flex-grow overflow-y-scroll scrollbar-none pb-2">
                <DmMessageList userName={userName} />
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

function DmConversationHeader({ userName }: DmConversationProps) {
    const { setDotsDropdown } = useContext(ModalContext);

    return (
        <>
            <div className="flex justify-between items-center">
                <UserDMInfo userName={userName} />
                <button onClick={() => setDotsDropdown(true)}>
                    <HiDotsVertical className="text-secondary-200 h-8 w-8" />
                </button>
            </div>
        </>
    );
}

function UserDMInfo({ userName }: DmConversationProps) {
    const user = DMConversations[userName as keyof typeof DMConversations];

    const statusColor = getStatusColor(user.userStatus);
    const statusMsg = getStatusMsg(user.userStatus);

    return (
        <div className="flex items-center gap-3">
            <Link href={`/profile/${userName}`}>
                <img
                    src={user.userImg}
                    alt={`${userName}'s avatar`}
                    className="w-12 h-12 object-cover border-[3px] border-secondary-200 rounded-full"
                />
            </Link>

            <div>
                {/* TODO: Make profile dynamic later (/profile/username) */}
                <Link href={`/profile/${userName}`}>
                    <h1 className="text-white text-lg font-bold">{userName}</h1>
                </Link>
                <div className="flex items-center gap-1">
                    <div
                        className={`w-3 h-3 rounded-full ${statusColor}`}
                    ></div>
                    <p className="text-white text-xs select-none">
                        {statusMsg}
                    </p>
                </div>
            </div>
        </div>
    );
}

function DmMessageList({ userName }: DmConversationProps) {
    const messages =
        DMConversations[userName as keyof typeof DMConversations].messages;

    if (!messages || messages.length === 0)
        return (
            <div className="text-cube_palette-200 font-jost font-light text-center">
                Send a private message to {userName}
            </div>
        );

    function generateMessage(msg: Message, idx: number) {
        const userStyles =
            'rounded-bl-xl rounded-br-xl rounded-tr-xl bg-white self-start';
        const myStyles =
            'rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-secondary-200 self-end';

        return (
            <li
                key={idx}
                className={`text-background font-mulish p-2 w-fit max-w-[80%] hyphens-auto
                            shadow-[5px_5px_0px_0px_rgba(37,10,59)]
                            ${msg.isMe ? myStyles : userStyles}`}
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
