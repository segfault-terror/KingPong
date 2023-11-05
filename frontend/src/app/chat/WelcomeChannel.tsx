import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowLeftShort } from 'react-icons/bs';
import Loading from '../loading';

type WelcomeChannelProps = {
    channelName: string;
    channelVisibility: string;
    setWelcomeChannel: (val: boolean) => void;
    setJoinChannel: (val: boolean) => void;
};

type ChannelContentProps = Pick<WelcomeChannelProps, 'channelName'> & {
    mutate: Function;
};

function PublicChannelContent({ channelName, mutate }: ChannelContentProps) {
    return (
        <>
            <p className="text-left text-silver font-light font-jost w-1/2">
                Welcome to {channelName}, you can click continue to proceed.
            </p>
            <button
                onClick={() => {
                    mutate({ channelName });
                }}
                className="bg-secondary-200
                            text-background
                            font-bold
                            block w-40 py-1
                            rounded-2xl mx-auto mt-8"
            >
                Continue
            </button>
        </>
    );
}

function ProtectedChannelContent(props: {
    channelName: string;
    mutate: Function;
    setRedirectChannel: Function;
    wrongPassword: boolean;
    setWrongPassword: Function;
}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { password: '' },
    });

    return (
        <form
            onSubmit={handleSubmit(() => {
                console.log(`[onSubmit] Joining `);
                props.mutate({
                    channelName: props.channelName,
                    password: watch('password'),
                });
                props.setWrongPassword(false);
            })}
            className="flex flex-col items-center justify-center gap-4"
        >
            <p className="text-center text-silver font-light font-jost">
                This channel is protected by a password, please enter it to
                continue.
            </p>
            <input
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                    },
                    maxLength: {
                        value: 32,
                        message: 'Password must be at most 32 characters',
                    },
                })}
                type="password"
                placeholder="Password"
                className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1
                        w-[60%]
                        text-sm"
            />
            {props.wrongPassword && !errors.password?.message && (
                <p className="text-red-400">Wrong password</p>
            )}
            <p className="text-red-400">{errors.password?.message}</p>
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

export default function WelcomeChannel({
    channelName,
    channelVisibility,
    setWelcomeChannel,
    setJoinChannel,
}: WelcomeChannelProps) {
    const [redirectChannel, setRedirectChannel] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    useEffect(() => {
        if (!redirectChannel) return;
        redirect(`/chat/channel/${channelName}`);
    }, [redirectChannel, channelName, channelVisibility]);

    const { mutate, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            try {
                const { data: channel } = await axios.post(
                    `/api/chat/channel/join`,
                    { withCredentials: true, ...args },
                );
                setRedirectChannel(true);
                return channel;
            } catch (e) {
                setWrongPassword(true);
            }
        },
    });

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-row items-center mb-8">
                <button
                    onClick={() => {
                        setWelcomeChannel(false);
                        setJoinChannel(true);
                    }}
                >
                    <BsArrowLeftShort className="text-secondary-200 text-center text-4xl" />
                </button>
                <h1 className="text-center text-2xl font-jost inline-block w-full">
                    <span className="text-secondary-200">Join</span>
                    &nbsp;
                    <span className="text-silver">#{channelName}</span>
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {channelVisibility === 'public' && (
                    <PublicChannelContent
                        channelName={channelName}
                        mutate={mutate}
                    />
                )}
                {channelVisibility === 'protected' && (
                    <ProtectedChannelContent
                        channelName={channelName}
                        mutate={mutate}
                        setRedirectChannel={setRedirectChannel}
                        wrongPassword={wrongPassword}
                        setWrongPassword={setWrongPassword}
                    />
                )}
            </div>
        </div>
    );
}
