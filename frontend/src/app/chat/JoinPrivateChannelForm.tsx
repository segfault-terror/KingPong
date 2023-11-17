import { useSocket } from '@/contexts/SocketContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../loading';

export default function JoinPrivateChannelForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { password: '' },
    });

    const [wrongPassword, setWrongPassword] = useState(false);
    const [redirectChannel, setRedirectChannel] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    const { mutate: joinChannel, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            const { data: channel } = await axios.post(
                `/api/chat/channel/join/private`,
                {
                    withCredentials: true,
                    ...args,
                },
            );
            return channel;
        },
        onSuccess: (res: any) => {
            setChannelName(res.name);
            setRedirectChannel(true);
            socket?.emit('update-channel-sidebar', res.name);
            queryClient.invalidateQueries(['channel', res.name, 'members'], {
                exact: true,
            });
        },
        onError: (err: any) => {
            if (err.response.status === 404) setWrongPassword(true);
            else setErrorMessage(err.response.data.message);
        },
    });

    useEffect(() => {
        if (isLoading) return;
        if (redirectChannel) {
            redirect(`/chat/channel/${channelName}`);
        }
    }, [redirectChannel, isLoading, channelName]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(() => {
                joinChannel({
                    inviteCode: watch('password'),
                });
                setWrongPassword(false);
            })}
            className="flex flex-col items-center justify-center gap-4"
        >
            <p className="text-center text-silver font-light font-jost">
                Please provide the invite code to join a private channel.
            </p>
            <input
                {...register('password', {
                    required: 'Invite code is required',
                    minLength: {
                        value: 10,
                        message: 'Invite code must be 10 characters long',
                    },
                    maxLength: {
                        value: 10,
                        message: 'Invite code must be 10 characters long',
                    },
                })}
                type="text"
                placeholder="Invite code"
                className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1
                        w-[60%]
                        text-sm"
            />
            {wrongPassword && !errors.password?.message && (
                <p className="text-red-400">Wrong Code</p>
            )}
            <p className="text-red-400">{errors.password?.message}</p>
            <p className="text-red-400">{errorMessage}</p>
            <button
                type="submit"
                className="bg-secondary-200
                            text-background
                            font-bold
                            block w-40 py-1
                            rounded-2xl mx-auto"
            >
                Continue
            </button>
        </form>
    );
}
