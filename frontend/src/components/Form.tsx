import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';

type Inputs = {
    example: string;
    exampleRequired: string;
};

type SignUpInputs = {
    fullname: string;
    username: string;
    email: string;
    password: string;
};

const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    console.log('sending data to backend', data);
};

export function SignUpForm() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignUpInputs>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-16 my-4">
                <Controller
                    name="fullname"
                    control={control}
                    render={({ field }) => <Input {...field}>Full Name</Input>}
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
                    render={({ field }) => <Input {...field}>Username</Input>}
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
                            message:
                                'Username must be alphanumeric and start with a letter',
                        },
                    }}
                />
                {errors.username && (
                    <span className="text-xs text-red-500">
                        {errors.username.message}
                    </span>
                )}
            </div>

            <div className="h-16 my-4">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input type="email" {...field}>
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
                            message:
                                'Email must in the format of: example@example.com',
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
                        <Input type="password" {...field}>
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

            <button
                type="submit"
                className="text-primary bg-secondary-200 font-jost font-bold w-full h-10 rounded-3xl group relative"
            >
                Sign up
            </button>
        </form>
    );
}

export default function Form() {
    return <></>;
}
