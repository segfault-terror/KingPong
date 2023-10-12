export default function ChatMenu() {
    return (
        <ul
            className="w-24 p-2
                        text-center
                        flex flex-col gap-2
                        border-[1px] border-secondary-200 rounded-2xl
                        bg-background"
        >
            <ChatMenuItem text="Block" />
            <ChatMenuItem text="Block" />
            <ChatMenuItem text="Block" />
        </ul>
    );
}

type ChatMenuItemProps = {
    text: string;
};

function ChatMenuItem({ text }: ChatMenuItemProps) {
    return (
        <li className="text-silver hover:bg-primary hover:rounded-xl py-1">
            <button>{text}</button>
        </li>
    );
}
