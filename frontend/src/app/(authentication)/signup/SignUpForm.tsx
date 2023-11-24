'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { redirect } from 'next/navigation';

type SignUpInputs = {
    fullname: string;
    username: string;
    email: string;
    password: string;
};

type CustomError = AxiosError & {
    response: {
        data: {
            message: string;
        };
    };
};

const registerUser = async (data: SignUpInputs) => {
    try {
        const { data: response } = await axios.post(`/api/user/register`, data);
        return response;
    } catch (error) {
        const err = error as CustomError;
        throw err.response?.data?.message;
    }
};

export default function SignUpForm() {
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const { mutate, isLoading, isError, error } = useMutation(registerUser, {
        onSuccess: async (data) => {
            const { data: res } = await axios.post(
                `/api/auth/login`,
                {
                    username: data.username,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            );
            setLoggedIn(true);
        },
        onError: async (error: string) => {},
    });

    if (loggedIn) {
        setLoggedIn(false);
        redirect('/home');
    }

    const onSignUp: SubmitHandler<SignUpInputs> = (data) => {
        const { fullname, username, email, password } = data;
        setPassword(password);
        mutate({
            fullname,
            username,
            email,
            password,
        });
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignUpInputs>({
        defaultValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
        },
    });

    return (
        <form onSubmit={handleSubmit(onSignUp)}>
            <div className="h-16 my-4">
                <Controller
                    name="fullname"
                    control={control}
                    render={({ field }) => (
                        <Input id="fname" {...field}>
                            Full Name
                        </Input>
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'Full Name is required',
                        },
                        minLength: {
                            value: 3,
                            message: 'Full Name must be at least 3 characters',
                        },
                    }}
                />
                {errors.fullname && (
                    <span className="text-xs text-red-500">
                        {errors.fullname.message}
                    </span>
                )}
            </div>

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
                            message: 'Username must be at least 2 characters',
                        },
                        maxLength: {
                            value: 15,
                            message: 'Username must be at most 15 characters',
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
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input id="email" type="email" {...field}>
                            Email
                        </Input>
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: 'Email format is invalid.',
                        },
                    }}
                />
                {errors.email && (
                    <span className="text-xs text-red-500">
                        {errors.email.message}
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
                            message: 'Password must be at least 8 characters',
                        },
                        maxLength: {
                            value: 32,
                            message: 'Password must be at most 32 characters',
                        },
                    }}
                />
                {errors.password && (
                    <span className="text-xs text-red-500">
                        {errors.password.message}
                    </span>
                )}
            </div>
            <div className=" my-4">
                {isError && <span className=" text-red-500">{error}</span>}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="text-primary bg-secondary-200 font-jost font-bold w-full h-10 rounded-3xl group relative
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                        ease-in-out delay-75 hover:bg-secondary-500 hover:border-r-2 hover:border-l-2 hover:border-white hover:scale-90 hover:text-white"
            >
                Sign up
            </button>
        </form>
    );
}
