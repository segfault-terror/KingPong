'use client';

import Image from 'next/image';
import React from 'react';
import UploadInput from './UploadInput';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UseFormRegister, UseFormResetField, useForm } from 'react-hook-form';

const profile = {
    avatar: '',
};

export type SettingInputs = {
    fullname: string;
    username: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    // avatar: HTMLInputElement['files'];
    avatar: any;
    avatarUrl: string;
};

function UploadAvatar({
    register,
    resetField,
}: {
    register: UseFormRegister<SettingInputs>;
    resetField: UseFormResetField<SettingInputs>;
}) {
    const [image, setImage] = React.useState(profile.avatar);

    return (
        <>
            <img
                src={image}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-full border border-secondary-200"
            />
            <UploadInput
                resetField={resetField}
                register={register}
                setImage={setImage}
                defaultImage={profile.avatar}
            />
        </>
    );
}

export default function Settings() {
    // fetch data from backend
    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            try {
                const me = await axios.get(`/api/user/me`, {
                    withCredentials: true,
                });
                setValue('fullname', me.data.fullname);
                setValue('username', me.data.username);
                return me.data;
            } catch {
                // redirect('/signin');
            }
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        resetField,
        formState: { errors },
    } = useForm<SettingInputs>({
        defaultValues: {
            fullname: '',
            username: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
            avatar: null,
        },
    });
    profile.avatar = data?.avatar;

    const updateUser = async (data: SettingInputs) => {
        console.log(data);
    };

    if (isLoading) return <div>Loading...</div>;
    return (
        <main className="flex items-center justify-center my-9">
            <div
                className="bg-background border border-secondary-200 rounded-3xl lg:max-w-5xl w-full mx-2
                            flex flex-col items-center justify-center gap-8 p-3"
            >
                <h2 className="font-jost text-4xl font-bold text-secondary-200">
                    Settings
                </h2>
                <form
                    className="grid w-full gap-6 lg:grid-cols-2"
                    onSubmit={handleSubmit(updateUser)}
                >
                    <div className="flex flex-col items-center justify-center gap-4">
                        <UploadAvatar resetField={resetField} register={register} />
                    </div>
                    <div className="lg:px-12 flex flex-col gap-6">
                        <input
                            {...register('fullname', {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message:
                                        'Fullname must be at least 3 characters',
                                },
                            })}
                            type="text"
                            placeholder="Fullname"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            {...register('username', {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message:
                                        'Username must be at least 3 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message:
                                        'Username must be at most 15 characters',
                                },
                            })}
                            type="text"
                            placeholder="Username"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Current Password"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            {...register('newPassword', {
                                validate: (value) => {
                                    if (!value) return true;
                                    if (value && value.length > 0 && value.length < 8) {
                                        return 'Password must be at least 8 characters';
                                    }
                                    return (
                                        value !== getValues('password') ||
                                        'The new password must be different from the current password'
                                    );
                                }
                            })}
                            type="password"
                            placeholder="New Password"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        {errors.newPassword && (<p className="text-red-500 text-sm\">{errors.newPassword.message}</p>)}
                        <input
                            {...register('confirmPassword', {
                                validate: (value) => {
                                    return (
                                        value === getValues('newPassword') ||
                                        'The passwords do not match'
                                    );
                                }
                            })}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        {errors.confirmPassword && (<p className="text-red-500 text-sm\">{errors.confirmPassword.message}</p>)}
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all"
                            >
                                Enable 2FA
                            </button>
                            <button
                                type="submit"
                                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
