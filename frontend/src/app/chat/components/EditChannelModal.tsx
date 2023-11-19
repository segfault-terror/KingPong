import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditChannelModal(props: {
    channelName: string;
    channelType: string;
    setShowEditChannelModal: (val: boolean) => void;
}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [channelExists, setChannelExists] = useState(false);
    const [redirectChannel, setRedirectChannel] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: props.channelName,
            visibility: props.channelType,
            password: '',
        },
    });

    useEffect(() => {
        if (!redirectChannel) return;
        redirect(`/chat/channel/${watch('name')}`);
    }, [redirectChannel, watch]);

    const { socket } = useSocket();

    const { mutate, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            await axios.post(`/api/chat/channel/${props.channelName}/edit`, {
                withCredentials: true,
                ...args,
            });
        },
        onSuccess: () => {
            setRedirectChannel(true);
            socket?.emit('channel-edited', {
                oldName: props.channelName,
                newName: watch('name'),
            });
        },
        onError: () => {
            setChannelExists(true);
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
        <Modal
            onClose={() => props.setShowEditChannelModal(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                                        lg:w-2/3 max-w-[600px]"
        >
            <form
                onSubmit={handleSubmit(() => {
                    if (
                        watch('visibility') === 'PROTECTED' &&
                        !watch('password')
                    ) {
                        setErrorMessage(
                            'Password is required for protected channels',
                        );
                        return;
                    }

                    mutate({
                        newName: watch('name') || null,
                        newType: watch('visibility') || null,
                        password: watch('password') || null,
                    });
                })}
                className="text-white accent-secondary-200
                        flex flex-col gap-4 font-jost"
            >
                <h1 className="text-secondary-200 text-center text-2xl mb-4">
                    Edit channel
                </h1>

                <div>
                    <input
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 1,
                                message: 'Name is too short',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Name is too long',
                            },
                        })}
                        type="text"
                        placeholder="Name"
                        className="border-[1px] border-secondary-200 rounded-2xl outline-none
                            bg-background
                            px-4 py-[1px]
                            text-white font-jost placeholder:text-silver
                            w-full"
                    />
                    <p className="text-red-400">{errors.name?.message}</p>
                    {channelExists && !errors.name?.message && (
                        <p className="text-red-400">
                            This name already exists, please pick another one
                        </p>
                    )}
                </div>

                <div>
                    <p className="text-silver mb-2">Visibility</p>
                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('visibility', {
                                required: 'Visibility is required',
                            })}
                            id="public"
                            className="peer"
                            value="PUBLIC"
                            required
                        />
                        <label
                            htmlFor="public"
                            className="peer-checked:text-secondary-200"
                        >
                            Public
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('visibility', {
                                required: 'Visibility is required',
                            })}
                            id="private"
                            className="peer"
                            value="PRIVATE"
                            required
                        />
                        <label
                            htmlFor="private"
                            className="peer-checked:text-secondary-200"
                        >
                            Private
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('visibility', {
                                required: 'Visibility is required',
                            })}
                            id="protected"
                            className="peer"
                            value="PROTECTED"
                            required
                        />
                        <label
                            htmlFor="protected"
                            className="peer-checked:text-secondary-200"
                        >
                            Protected
                        </label>
                    </div>
                </div>

                <div
                    className={
                        watch('visibility') === 'PROTECTED' ? 'block' : 'hidden'
                    }
                >
                    <input
                        {...register('password', {
                            minLength: {
                                value: 8,
                                message:
                                    'Password must be at least 8 characters',
                            },
                            maxLength: {
                                value: 32,
                                message:
                                    'Password must be at most 32 characters',
                            },
                        })}
                        type="password"
                        placeholder="New password"
                        className="border-[1px] border-secondary-200 rounded-2xl outline-none
                            bg-background
                            px-4 py-[1px]
                            text-white font-jost placeholder:text-silver
                            w-full"
                    />
                    <p className="text-red-400">{errors.password?.message}</p>
                    <p className="text-red-400">{errorMessage}</p>
                </div>

                <button
                    type="submit"
                    className="bg-secondary-200
                            text-background
                            font-bold
                            w-40 py-1
                            rounded-2xl
                            self-center"
                >
                    Save
                </button>
            </form>
        </Modal>
    );
}
