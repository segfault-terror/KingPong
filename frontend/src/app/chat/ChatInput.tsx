import { useSocket } from '@/contexts/SocketContext';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import Loading from '../loading';

type ChatInputProps = {
    sendMessage: Function;
    username?: string;
    channelName?: string;
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

    const { data, isLoading } = useQuery({
        queryKey: ['is-muted', username],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/chat/channel/${channelName}/is-muted/${username}`,
                { withCredentials: true },
            );
            return data;
        },
        refetchOnWindowFocus: false,
    });

    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (!channelName || !data) return;

        let timeoutId: NodeJS.Timeout;

        if (data.isMuted) {
            setIsMuted(true);

            const now = new Date();
            const muteExpire = new Date(data.expiresAt);

            timeoutId = setTimeout(
                () => setIsMuted(false),
                muteExpire.getTime() - now.getTime(),
            );
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [data]);

    useEffect(() => {
        socket?.on('typing', (data) => setIsTyping(data.isTyping));

        socket?.on('new-message', () => {
            console.log(`Invalidating query [dm, ${username}]`);
            queryClient.invalidateQueries(['dm', username], {
                exact: true,
            });
            queryClient.invalidateQueries(['dms', 'brief'], {
                exact: true,
            });
        });

        socket?.on('new-channel-message', () => {
            console.log(`Invalidating query [channel, ${channelName}]`);
            queryClient.invalidateQueries(['channel', channelName], {
                exact: true,
            });
            queryClient.invalidateQueries(['channels', 'brief'], {
                exact: true,
            });
        });

        return () => {
            socket?.off('typing');
            socket?.off('new-message');
            socket?.off('new-channel-message');
        };
    });

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    let typingTimeout: NodeJS.Timeout | null;
    const typingDelay = 1000;

    function onUserTyping() {
        if (typingTimeout) clearTimeout(typingTimeout);

        if (channelName) {
            if (!typingTimeout) {
                socket?.emit('typing', {
                    username,
                    isTyping: true,
                    isChannel: true,
                    channelName,
                });
            }
        } else {
            if (!typingTimeout) {
                socket?.emit('typing', {
                    username,
                    isTyping: true,
                    isChannel: false,
                });
            }
        }

        typingTimeout = setTimeout(() => {
            if (channelName)
                socket?.emit('typing', {
                    username,
                    isTyping: false,
                    isChannel: true,
                    channelName,
                });
            else
                socket?.emit('typing', {
                    username,
                    isTyping: false,
                    isChannel: false,
                });
            typingTimeout = null;
        }, typingDelay);
    }

    return (
        <div
            className="flex justify-between items-center relative
                bg-background rounded-full pr-2"
        >
            <input
                disabled={isMuted}
                ref={inputRef}
                type="text"
                autoFocus
                placeholder={isMuted ? 'You are muted' : 'Write a message'}
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
                    } else {
                        console.log(`${username} is typing...}`);
                        onUserTyping();
                    }
                }}
            />
            {!isMuted && (
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
            )}
        </div>
    );
}
