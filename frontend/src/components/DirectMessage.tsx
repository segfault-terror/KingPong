import Image from 'next/image';

type DirectMessageProps = {
    username: string;
    imagePath: string;
    lastMessage: string;
};

function DirectMessage({
    username,
    imagePath,
    lastMessage,
}: DirectMessageProps) {
    return (
        <div className="flex items-center gap-4 h-16">
            <Image
                src={imagePath}
                alt={username}
                width="64"
                height="64"
                objectFit="cover"
                className="border-secondary rounded-full border-4 border-solid
                            min-w-[64px] max-w-[64px]
                            max-h-full"
            />
            <div className="flex flex-col min-w-0">
                <p className="font-jost font-bold text-white">{username}</p>
                <p
                    className="font-jost font-light text-white
                                whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {`You: ${lastMessage}`}
                </p>
            </div>
        </div>
    );
}

export default DirectMessage;
