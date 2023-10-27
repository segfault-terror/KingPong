import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default DirectMessage;

function DirectMessage({
    username,
    avatar,
    lastMessage,
    status,
}: DirectMessageProps) {
    const statusColor = getStatusColor(status);
    const pathname = usePathname();

    return (
        <Link
            href={`/chat/dm/${username}`}
            replace={pathname.startsWith('/chat/dm')}
        >
            <div className="flex items-center gap-4 hover:bg-background/80 hover:rounded-full">
                <div className="relative flex-shrink-0">
                    <img
                        src={avatar}
                        alt={`${username}'a avatar`}
                        title={`${username}'a avatar`}
                        className="border-secondary-200 rounded-full border-4
                                w-[64px] h-[64px]
                                text-white object-cover select-none
                                bg-background"
                    />
                    <div
                        className={`w-[12px] h-[12px]
                                rounded-full
                                ${statusColor}
                                absolute right-0 bottom-2`}
                    ></div>
                </div>
                <div className="flex flex-col min-w-0">
                    <p className="font-jost font-bold text-white">{username}</p>
                    <p
                        className="font-jost font-light text-gray-400
                                whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100vw-200px)]"
                    >
                        {lastMessage.sender.username === username
                            ? `${username}: ${lastMessage.content}`
                            : `You: ${lastMessage.content}`}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export enum UserStatus {
    Online = 'online',
    Offline = 'offline',
    InGame = 'in-game',
}

export function getStatusColor(status: string) {
    switch (status) {
        case 'ONLINE':
            return 'bg-online';
        case 'OFFLINE':
            return 'bg-inactive-200';
        case 'INGAME':
            return 'bg-ingame';
    }
}

export type DirectMessageProps = {
    username: string;
    avatar: string;
    lastMessage: any;
    status: UserStatus;
};
