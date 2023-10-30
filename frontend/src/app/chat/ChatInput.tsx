import { useRef } from 'react';
import { BiSolidSend } from 'react-icons/bi';

type ChatInputProps = {
    sendMessage: Function;
};

export default function ChatInput({ sendMessage }: ChatInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex justify-between items-center relative">
            <input
                ref={inputRef}
                type="text"
                autoFocus
                placeholder="Write a message"
                className="px-4 py-2 bg-background rounded-full
                    text-cube_palette-200 placeholder-cube_palette-200
                    font-jost
                    flex-grow
                    outline-none"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        if (event.currentTarget.value.trim() === '') return;

                        sendMessage(event.currentTarget.value);
                        event.currentTarget.value = '';
                        event.currentTarget.focus();
                    }
                }}
            />
            <button
                className="absolute right-2"
                onClick={() => {
                    if (inputRef.current == null) return;
                    if (inputRef.current.value.trim() === '') return;

                    sendMessage(inputRef.current.value);
                    inputRef.current.value = '';
                    inputRef.current.focus();
                }}
            >
                <BiSolidSend className="text-secondary-200 text-3xl" />
            </button>
        </div>
    );
}
