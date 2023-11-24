'use client';
import React, { useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '../loading';

interface TwoFAFormData {
    pincode: string;
}

const Page: React.FC = () => {
    const [tfa, setTfa] = React.useState(false);
    const [error, setError] = React.useState('');

    const queryClient = useQueryClient();

    const updateUser = async () => {
        try {
            const me = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            const { data: response } = await axios.post(
                `/api/user/update`,
                {
                    ...me.data,
                    needOtp: false,
                },
                {
                    withCredentials: true,
                },
            );
            return response;
        } catch (error) {
            const err = error as any;
            setError(err.response?.data?.message);
            throw err.response?.data?.message;
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TwoFAFormData>();

    const onSubmit: SubmitHandler<TwoFAFormData> = async (data) => {
        // Get the pincode from the form data.
        data.pincode;
        console.log('pincode: ', data.pincode);
        verify({ twofactorAuthenticationCode: data.pincode });
        try {
            if (error != '') throw 'Invalid pincode';
            console.log('2FA code verified successfully', error);
        } catch (error) {
            console.log('2FA code verification failed:');
            // setError('Invalid pincode');
        }
    };

    const handleOnChange = (e: any) => {
        setValue('pincode', e.target.value);
    };

    const updateTfa = async (data: any) => {
        try {
            const { data: response } = await axios.post(
                '/api/auth/2fa/enable',
                {
                    twoFactorAuthenticationCode:
                        data.twofactorAuthenticationCode,
                },
                {
                    withCredentials: true,
                },
            );
            console.log('response: ', response);
            if (response.status === false) throw response.message;
            return response;
        } catch (error) {
            setError('Invalid pincode');
            console.log('error: ', error);
            throw error;
        }
    };
    const {
        mutate: verify,
        isLoading: isLoadingVerify,
        isError,
    } = useMutation(updateTfa, {
        onSuccess: () => {
            console.log('success ++++');
            update();
        },
        onError: (error: string) => {
            setError(error);
            throw error;
        },
    });

    const { mutate: update } = useMutation(updateUser, {
        onSuccess: () => {
            console.log('success');
            setTfa(true);
            queryClient.invalidateQueries(['needOtp']);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { data: me, isLoading: myisLoading } = useQuery({
        queryKey: ['needOtp'],
        queryFn: async () => {
            try {
                return await axios.get(`/api/user/me/needOtp`, {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
    });

    if (isLoadingVerify || myisLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    if (tfa || me?.data === false) {
        console.log('redirecting home');
        setTfa(false);
        redirect('/home');
    }

    return (
        <div className="w-[350px] h-[250px] m-auto drop-shadow-neon-white">
            <Head>
                <title>2FA Authentication</title>
            </Head>

            <form
                id="form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-300px h-[260px] bg-gradient-to-tl from-primary to-[#005248] border-r-2 border-l-2 border-secondary-500 m-auto flex flex-col justify-around items-center rounded-lg shadow-lg"
            >
                <h1
                    className={`text-2xl font-jost flex justify-center items-center h-12 w-[90%] rounded-full self-auto`}
                >
                    Two-Factor Authentication
                    <img
                        src={'/images/lock.svg'}
                        alt=""
                        className="w-12 h-12 rounded-full"
                    />
                </h1>

                <div className="my-2">
                    <label
                        htmlFor="pincode"
                        className="text-black font-jost flex flex-col justify-around"
                    >
                        {error != '' ? (
                            <span className="text-black text-lg underline decoration-red-300 bg-red-600 rounded-xl text-center drop-shadow-[0px_0px_5px_#ff0000] my-2">
                                {error}
                            </span>
                        ) : null}
                        <input
                            id="pincode"
                            type="number"
                            className={classNames(
                                'text-start font-jost h-8 w-44 rounded-lg border remove-arrow',
                                {
                                    'border-gray-300': !errors.pincode,
                                    'border-red-600 ': errors.pincode,
                                },
                            )}
                            placeholder="Enter 6 digits"
                            {...register('pincode', {
                                required: true,
                                minLength: 6,
                                maxLength: 6,
                            })}
                            onChange={handleOnChange}
                        />
                    </label>
                    {errors.pincode && (
                        <span className="text-black text-sm underline decoration-red-500">
                            Please enter a 6-digit pincode.
                        </span>
                    )}
                </div>
                <div className="flex flex-col justify-start items-center">
                    <button
                        type="submit"
                        className="px-4 py-1 rounded-md bg-primary hover:bg-secondary-200 hover:text-black transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            window.open('/api/auth/logout', '_self');
                        }}
                        className="text-sm text-black underline font-thin"
                    >
                        Logout
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
