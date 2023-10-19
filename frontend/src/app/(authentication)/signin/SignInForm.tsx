'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input';
import { IoLogoGoogle } from 'react-icons/io';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { backendHost } from '@/app/globals';

type SignInInputs = {
    username: string;
    password: string;
};

type CustomError = AxiosError & {
    response: {
        data: {
            message: string;
        };
    };
};

const loginUser = async (data: SignInInputs) => {
    try {
        const { data: response } = await axios.post(
            `${backendHost}/auth/login`,
            data,
            {
                withCredentials: true,
            },
        );
        return response;
    } catch (error) {
        const err = error as CustomError;
        throw err.response?.data?.message;
    }
};

const onSignInWith42 = () => {
    window.open(
        `${backendHost}/auth/intra/login`,
        'login42',
        'width=550,height=800,toolbar=0,status=0,',
    );
};

const onSignInWithGoogle = () => {
    window.open(
        `${backendHost}/auth/google/login`,
        'loginGoogle',
        'width=550,height=800,toolbar=0,status=0,',
    );
};

export default function SignInForm() {
    const [loggedIn, setLoggedIn] = useState(false);
    const { mutate, isLoading, isError } = useMutation(loginUser, {
        onSuccess: async (data) => {
            setLoggedIn(true);
        },
    });

    const onSignIn: SubmitHandler<SignInInputs> = (data) => {
        mutate({
            username: data.username,
            password: data.password,
        });
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInInputs>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    if (loggedIn) {
        setLoggedIn(false);
        redirect('/home');
    }

    return (
        <>
            <button
                className="text-white bg-primary font-jost font-bold 
                        w-full h-10 rounded-3xl my-4 flex items-center justify-center gap-2"
                onClick={onSignInWith42}
            >
                <svg
                    viewBox="0 -200 960 960"
                    className="fill-white"
                    width={24}
                    height={24}
                >
                    <polygon
                        id="polygon5"
                        points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1 
    32,279.1 "
                    />
                    <polygon
                        id="polygon7"
                        points="597.9,114.2 762.7,-51.1 597.9,-51.1 "
                    />
                    <polygon
                        id="polygon9"
                        points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "
                    />
                    <polygon
                        id="polygon11"
                        points="928,279.1 762.7,443.9 928,443.9 "
                    />
                </svg>
                Sign In with 42 Intranet
            </button>
            <button
                className="text-white bg-primary font-jost font-bold 
                        w-full h-10 rounded-3xl mb-6 flex items-center justify-center"
                onClick={onSignInWithGoogle}
            >
                <IoLogoGoogle className="inline-block mr-2 w-5 h-5" />
                Sign In with Google
            </button>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-[0.5px] my-8 border-secondary-200" />
                <span className="absolute px-3 font-medium -translate-x-1/2 bg-background left-1/2 text-white select-none">
                    or
                </span>
            </div>
            <form onSubmit={handleSubmit(onSignIn)}>
                <div className="h-16 my-4">
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Input id="uname" {...field}>
                                Username
                            </Input>
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Username is required',
                            },
                            minLength: {
                                value: 2,
                                message:
                                    'Username must be at least 2 characters',
                            },
                            maxLength: {
                                value: 15,
                                message:
                                    'Username must be at most 15 characters',
                            },
                            pattern: {
                                value: /^[A-Za-z][A-Za-z0-9_]{1,14}$/g,
                                message: 'Username format is invalid',
                            },
                        }}
                    />
                    {errors.username && (
                        <span
                            className="text-xs text-red-500"
                            title={errors.username.message}
                        >
                            {errors.username.message}
                        </span>
                    )}
                </div>

                <div className="h-16 my-4">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input id="pass" type="password" {...field}>
                                Password
                            </Input>
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Password is required',
                            },
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
                        }}
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <div className="my-4">
                    {isError && (
                        <span className="text-xs text-red-500">
                            Username or password is incorrect
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-primary bg-secondary-200 font-jost font-bold w-full h-10 rounded-3xl
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sign in
                </button>
            </form>
        </>
    );
}
