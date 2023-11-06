import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../loading';
import { redirect } from 'next/navigation';

export default function CreateNewChannel() {
    const [redirectPage, setRedirectPage] = useState(false);
    useEffect(() => {
        if (!redirectPage) return;
        redirect(`/chat/channel/${watch('name')}`);
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [channelExists, setChannelExists] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            visibility: 'PUBLIC',
            password: '',
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            try {
                await axios.post('/api/chat/channel/create', {
                    withCredentials: true,
                    ...args,
                });
                setRedirectPage(true);
            } catch (e) {
                setChannelExists(true);
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
        <form
            onSubmit={handleSubmit(() => {
                if (watch('visibility') === 'PROTECTED' && !watch('password')) {
                    setErrorMessage(
                        'Password is required for protected channels',
                    );
                    return;
                }

                mutate({
                    channelName: watch('name'),
                    channelType: watch('visibility'),
                    password: watch('password'),
                });
                setChannelExists(false);
            })}
            className="text-white accent-secondary-200
                        flex flex-col gap-4 font-jost"
        >
            <h1 className="text-secondary-200 text-center text-2xl mb-4">
                Create new channel
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
                            message: 'Password must be at least 8 characters',
                        },
                        maxLength: {
                            value: 32,
                            message: 'Password must be at most 32 characters',
                        },
                    })}
                    type="password"
                    placeholder="Password"
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
                Create channel
            </button>
        </form>
    );
}
