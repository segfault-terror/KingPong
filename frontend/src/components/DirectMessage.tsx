import Image from 'next/image';

/**
 * Truncates a string to a given length
 * Example: truncateString("Hello World", 8) -> "Hello..."
 */
function truncateString(str: string, maxLen: number) {
    if (str.length <= maxLen) return str;
    return `${str.slice(0, maxLen - 3)}...`;
}

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
        <div className="flex justify-around items-center gap-1">
            <Image
                src={imagePath}
                alt={username}
                // WARN: Consider changing this to a more appropriate size
                width="64"
                height="64"
                className="border-solid border-4 border-secondary rounded-full"
            />
            <div className="flex flex-col">
                <p className="text-white font-jost font-bold">{username}</p>
                <p className="font-jost font-light text-white">
                    {truncateString(`You: ${lastMessage}`, 20)}
                </p>
            </div>
        </div>
    );
}

export default DirectMessage;
