import { useSocket } from '@/contexts/SocketContext';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { BiSolidSend } from 'react-icons/bi';

type ChatInputProps = {
    sendMessage: Function;
    username?: string;
    channelName?: string;
    isTyping: boolean;
    setIsTyping: Function;
};

export default function ChatInput({
    sendMessage,
    username,
    channelName,
    setIsTyping,
}: ChatInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        socket?.on('typing', (data) => setIsTyping(data.isTyping));

        socket?.on('new-message', () => {
            if (username /* DM */) {
                queryClient.invalidateQueries(['dm', username], {
                    exact: true,
                });
                queryClient.invalidateQueries(['dms', 'brief'], {
                    exact: true,
                });
            }
            if (channelName /* Channel */) {
                queryClient.invalidateQueries(['channel', channelName], {
                    exact: true,
                });
                queryClient.invalidateQueries(['channels', 'brief'], {
                    exact: true,
                });
            }
        });
        return () => {
            socket?.off('typing');
            socket?.off('new-message');
        };
    });

    let typingTimeout: NodeJS.Timeout | null;
    const typingDelay = 1000;

    function onUserTyping() {
        if (typingTimeout) clearTimeout(typingTimeout);

        if (!typingTimeout) {
            socket?.emit('typing', { username, isTyping: true });
        }

        typingTimeout = setTimeout(() => {
            socket?.emit('typing', { username, isTyping: false });
            typingTimeout = null;
        }, typingDelay);
    }

    return (
        <div
            className="flex justify-between items-center relative
                bg-background rounded-full pr-2"
        >
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

                        if (username /* DM */) {
                            socket?.emit('new-message', username);
                        }

                        event.currentTarget.value = '';
                        event.currentTarget.focus();
                    } else {
                        onUserTyping();
                    }
                }}
            />
            <button
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
