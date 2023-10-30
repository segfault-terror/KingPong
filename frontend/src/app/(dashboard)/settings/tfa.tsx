import Modal from '@/components/Modal';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface TfaProps {
    code: string;
}

function TFA({
    toggle,
    onToggle,
    setTfa,
}: {
    toggle: boolean;
    onToggle: Function;
    setTfa: Function;
}) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        resetField,
        formState: { errors },
    } = useForm<TfaProps>({
        defaultValues: {
            code: '',
        },
    });

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('code', event.target.value);
    };

    const updateTfa = async (data: any) => {
        console.log('data: ', data.data.code);
        try {
            const { data: response } = await axios.post(
                '/api/auth/2fa/authenticate',
                {
                    twoFactorAuthenticationCode: data.data.code,
                },
                {
                    withCredentials: true,
                },
            );
            console.log(response);
            return response;
        } catch (error) {
            const err = error as any;
            throw err.response?.data?.message;
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['keyQrCode'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/auth/2fa/generate`, {
                withCredentials: true,
            });
            const me = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return { qrCode: data.qrCode, me: me.data };
        },
        cacheTime: 5 * 60 * 1000,
    });

    const { mutate: verify, isLoading: isLoadingVerify } = useMutation(
        updateTfa,
        {
            onSuccess: () => {
                setTfa(true);
                onToggle(!toggle);
            },
            onError: (error) => {
                console.log(error);
            },
        },
    );

    const onSubmit: SubmitHandler<TfaProps> = (data) => {
        console.log(data.code);
        verify({ data });
    };

    let message = 'verify';
    if (isLoading || isLoadingVerify) message = 'loading...';

    return (
        <>
            <Modal
                onClose={() => {
                    onToggle(false);
                    resetField('code');
                }}
            >
                <div className="w-96 flex justify-center items-center text-2xl font-jost">
                    Two-Factory authentication{' '}
                    <img src={'/images/lock.svg'} alt="lock" />
                </div>
                <div className="w-96 h-96 bg-primary rounded-2xl">
                    <div className="flex flex-col">
                        <div className="justify-center flex items-center">
                            scan the qrCode with app authenticator
                        </div>
                        <div className="w-56 h-56 bg-black rounded-xl m-auto">
                            <img
                                src={data?.qrCode}
                                alt=""
                                className="w-full h-full"
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} id="1">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="code"
                                    className="text-white text-sm font-medium mt-2 flex items-start justify-start w-56 m-auto"
                                >
                                    <p className="text-red-600">*</p>
                                    Authentication code
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    minLength={6}
                                    maxLength={6}
                                    placeholder="Enter 6 digit code"
                                    required
                                    className="w-56 h-10 rounded-lg border-2 text-black border-gray-300 mt-2 m-auto"
                                    {...register('code', {
                                        required: true,
                                        validate: (value) => {
                                            if (
                                                value.length !== 6 ||
                                                !/^\d+$/.test(value)
                                            )
                                                return 'Code must be 6 digits';
                                        },
                                    })}
                                />
                                {errors.code && (
                                    <div className="flex justify-center items-center">
                                        {errors.code.message}
                                    </div>
                                )}
                                <button
                                    title="verify"
                                    type="submit"
                                    className="bg-green-500 text-black font-medium rounded-lg w-40 h-10 mt-4 m-auto"
                                >
                                    {message}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default TFA;
