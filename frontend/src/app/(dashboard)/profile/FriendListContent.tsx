import Link from 'next/link';

type FriendListContentProps = {
    username: string;
    status: string;
    avatar: string;
};

export default function FriendListContent({
    username,
    status,
    avatar,
}: FriendListContentProps) {
    let statusBg;
    let statusText;

    if (status === 'ONLINE') {
        statusBg = 'bg-online';
        statusText = 'text-online';
    } else if (status === 'OFFLINE') {
        statusBg = 'bg-silver';
        statusText = 'text-silver';
    } else {
        statusBg = 'bg-ingame';
        statusText = 'text-ingame';
    }

    return (
        <div className="flex items-center gap-8">
            <Link href={`/profile/${username}`} className="flex-shrink-0">
                <img
                    src={avatar}
                    alt={`${username}`}
                    className="w-24 h-24
						bg-background border-2 border-background
						rounded-full select-none"
                />
            </Link>
            <div className="flex flex-col items-start gap-1">
                <p
                    className="text-secondary-200 text-xl
							font-jost font-bold"
                >
                    {username}
                </p>
                <p
                    className={`${statusText} flex items-center justify-center gap-1`}
                >
                    <div
                        className={`w-[12px] h-[12px] ${statusBg} rounded-full`}
                    />
                    {status.toLowerCase()}
                </p>
                <Link
                    href={`/chat/dm/${username}`}
                    className="bg-background rounded-2xl px-4
						border border-white
						text-secondary-200 font-jost"
                >
                    Message
                </Link>
            </div>
        </div>
    );
}
