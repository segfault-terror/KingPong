export default DirectMessage;

import Image from 'next/image';

function DirectMessage({
    userName,
    imagePath,
    lastMessage,
    status,
}: DirectMessageProps) {
    const statusColor = getStatusColor(status);

    return (
        <div className="flex items-center gap-4 h-16">
            <div className="relative">
                <Image
                    src={imagePath}
                    alt={`${userName}'a avatar`}
                    title={`${userName}'a avatar`}
                    width="64"
                    height="64"
                    objectFit="cover"
                    className="border-secondary-200 rounded-full border-4 border-solid
                                min-w-[64px] max-w-[64px]
                                min-h-[64px] max-h-[64px]
                                text-white"
                />
                <div
                    className={`w-[12px] h-[12px]
                                rounded-full
                                ${statusColor}
                                absolute right-0 bottom-2`}
                ></div>
            </div>
            <div className="flex flex-col min-w-0">
                <p className="font-jost font-bold text-white">{userName}</p>
                <p
                    className="font-jost font-light text-inactive-200
                                whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {`You: ${lastMessage}`}
                </p>
            </div>
        </div>
    );
}

export enum UserStatus {
    Online = 'online',
    Offline = 'offline',
    InGame = 'in-game',
}

function getStatusColor(status: UserStatus) {
    switch (status) {
        case UserStatus.Online:
            return 'bg-online';
        case UserStatus.Offline:
            return 'bg-inactive-200';
        case UserStatus.InGame:
            return 'bg-ingame';
    }
}

type DirectMessageProps = {
    userName: string;
    imagePath: string;
    lastMessage: string;
    status: UserStatus;
};
