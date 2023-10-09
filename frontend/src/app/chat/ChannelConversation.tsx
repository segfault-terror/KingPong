import { HiDotsVertical } from 'react-icons/hi';
import { ChannelConversations } from './data/ChatData';
import Link from 'next/link';
import ChatInput from './ChatInput';

type ChannelConversationProps = {
    channelName: string;
};

export default function ChannelConversation(props: ChannelConversationProps) {
    const channelConversation =
        ChannelConversations[
            props.channelName as keyof typeof ChannelConversations
        ];

    return (
        <div
            className="flex flex-col items-stretch gap-8 h-full w-full
                bg-primary
                rounded-2xl
                px-4 py-3
                border-secondary-200 border-[1px]"
        >
            <div
                className="flex justify-between items-center
                            text-xl"
            >
                <h1 className="text-cube_palette-200">{props.channelName}</h1>
                <div className="text-secondary-200">
                    <HiDotsVertical />
                </div>
            </div>

            <div className="flex-grow overflow-scroll scrollbar-none">
                <ul className="flex flex-col gap-4 p-6 bg-primary">
                    {channelConversation.messages.length === 0 && (
                        <div className="text-cube_palette-200 font-jost font-light text-center">
                            Send a message to start a conversation
                        </div>
                    )}

                    {channelConversation.messages.length !== 0 &&
                        channelConversation.messages.map((message, idx) => (
                            <ChannelMessage
                                key={idx}
                                channelName={props.channelName}
                                text={message.text}
                                isMe={message.isMe}
                                senderName={message.sender.name}
                            />
                        ))}
                </ul>
            </div>

            <ChatInput />
        </div>
    );
}

type ChannelMessageProps = {
    channelName: string;
    text: string;
    isMe: boolean;
    senderName: string;
};

function ChannelMessage(props: ChannelMessageProps) {
    const defaultStyles =
        'text-background font-mulish p-2 w-fit max-w-[80%] hyphens-auto shadow-[5px_5px_0px_0px_rgba(37,10,59)] relative';
    const myStyles =
        'rounded-tl-xl rounded-br-xl rounded-bl-xl bg-secondary-200 self-end';
    const othersStyles =
        'rounded-bl-xl rounded-br-xl rounded-tr-xl bg-white self-start';

    const myImgStyles = 'absolute -right-5 bottom-5';
    const otherImgStyles = 'absolute -left-5 bottom-5';

    const channelData =
        ChannelConversations[
            props.channelName as keyof typeof ChannelConversations
        ];
    const senderData = channelData.members.find(
        (member) => member.name === props.senderName,
    );

    return (
        <li
            className={`${defaultStyles}
                        ${props.isMe ? myStyles : othersStyles}`}
        >
            {props.text}
            <Link href="#">
                <img
                    src={senderData?.img}
                    alt={`${senderData?.name}'s avatar`}
                    title={`${senderData?.name}'s avatar`}
                    className={`w-8 h-8
                            object-cover
                            border-[1px] border-secondary-200 rounded-full
                            ${props.isMe ? myImgStyles : otherImgStyles}`}
                />
            </Link>
        </li>
    );
}
