import { BiSolidSend } from 'react-icons/bi';

export default function ChatInput() {
    return (
        <div className="flex justify-between items-center relative">
            <input
                type="text"
                placeholder="Write a message"
                className="px-4 py-2 bg-background rounded-full
                    text-cube_palette-200 placeholder-cube_palette-200
                    font-jost
                    flex-grow
                    outline-none"
            />
            <button className="absolute right-2">
                <BiSolidSend className="text-secondary-200 text-3xl" />
            </button>
        </div>
    );
}
