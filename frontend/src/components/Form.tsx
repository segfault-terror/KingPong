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

export function SignUpForm() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignUpInputs>();
    const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
        console.debug('sending data to backend', data);
    };
    console.log(errors);
    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="h-16 my-2">
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
            <div className="h-16 my-2">
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
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                        maxLength: {
                            value: 15,
                            message: 'Username must be at most 15 characters',
                        },
                    }}
                />
                {errors.username && (
                    <span className="text-xs text-red-500">
                        {errors.username.message}
                    </span>
                )}
            </div>

            <input type="submit" className="text-white" />
        </form>
    );
}

export default function Form() {
    const {
        control,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    console.log(watch('example'));
    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="example"
                control={control}
                render={({ field }) => <Input {...field}> Username </Input>}
            />
            <br />
            <Controller
                name="exampleRequired"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <Input {...field} placeholder="Password" />
                )}
            />
            {errors.exampleRequired && <span>This field is required</span>}
            <br />
            <input type="submit" className="text-white" />
        </form>
    );
}
