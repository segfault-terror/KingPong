import { useSocket } from '@/contexts/SocketContext';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import Loading from '../loading';
import { usePathname } from 'next/navigation';

type ChatInputProps = {
    sendMessage: Function;
    username?: string;
    channelName?: string;
    setIsTyping: Function;
    setTypingUsername?: Function;
};

export default function ChatInput({
    sendMessage,
    username,
    channelName,
    setIsTyping,
    setTypingUsername,
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
    const [muteTime, setMuteTime] = useState('');

    useEffect(() => {
        if (!channelName || !data) return;

        let intervalId: NodeJS.Timeout | undefined = undefined;
        let timeoutId: NodeJS.Timeout | undefined = undefined;

        if (data.isMuted) {
            setIsMuted(true);

            const now = new Date();
            const muteExpire = new Date(data.expiresAt);

            timeoutId = setTimeout(
                () => setIsMuted(false),
                muteExpire.getTime() - now.getTime(),
            );
            intervalId = setInterval(() => {
                const now = new Date();
                const muteExpire = new Date(data.expiresAt);

                let diff = muteExpire.getTime() - now.getTime();
                const days = Math.floor(diff / 86400000);
                diff -= days * 86400000;
                const hours = Math.floor(diff / 3600000);
                diff -= hours * 3600000;
                const minutes = Math.floor(diff / 60000);
                diff -= minutes * 60000;
                const seconds = Math.floor(diff / 1000);

                let timeLeft = '';
                if (days > 0) {
                    timeLeft += `${days} days, `;
                }
                if (hours > 0) {
                    timeLeft += `${hours} hours, `;
                }
                if (minutes > 0) {
                    timeLeft += `${minutes} minutes and `;
                }
                timeLeft += `${seconds} seconds`;
                setMuteTime(timeLeft);
            }, 1000);
        } else {
            setIsMuted(false);
            if (timeoutId) clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        }

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [data]);

    const pathname = usePathname();

    useEffect(() => {
        socket?.on('typing', (data) => {
            if (pathname.startsWith('/chat/channel') && !data.isChannel) return;
            if (pathname.startsWith('/chat/dm') && data.isChannel) return;
            setIsTyping(data.isTyping);

            if (
                pathname.startsWith('/chat/channel') &&
                data.isChannel &&
                setTypingUsername
            ) {
                setTypingUsername(data.username);
            }
        });

        socket?.on('mute', () => {
            queryClient.invalidateQueries(['is-muted', username], {
                exact: true,
            });
        });

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
            socket?.off('mute');
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
                placeholder={
                    isMuted
                        ? `You are muted - Time left ${muteTime}`
                        : 'Write a message'
                }
                className={`px-4 py-2 bg-background rounded-full
                    text-cube_palette-200
                    font-jost
                    flex-grow
                    outline-none ${
                        isMuted
                            ? 'placeholder-secondary-500'
                            : 'placeholder-cube_palette-200'
                    }`}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        if (event.currentTarget.value.trim() === '') return;

                        sendMessage(event.currentTarget.value);

                        event.currentTarget.value = '';
                        event.currentTarget.focus();
                    } else {
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
