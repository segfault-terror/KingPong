import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { modalContext } from '@/contexts/contexts';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

type MuteUserFormProps = {
    channelName: string;
    usernameToMute: string;
    setShowMuteUserForm: (val: boolean) => void;
};

export default function MuteUserForm(props: MuteUserFormProps) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: { duration: '60' },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            await axios.post(`/api/chat/channel/${props.channelName}/mute`, {
                withCredentials: true,
                ...args,
            });
        },
    });

    const { setDotsDropdown } = useContext(modalContext);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <Modal
            onClose={() => props.setShowMuteUserForm(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                                        lg:w-2/3 max-w-[600px]"
        >
            <form
                onSubmit={handleSubmit(() => {
                    mutate({
                        usernameToMute: props.usernameToMute,
                        muteDuration: parseInt(watch('duration')),
                    });
                    props.setShowMuteUserForm(false);
                    setDotsDropdown(false);
                })}
                className="text-white accent-secondary-200
                        flex flex-col gap-4 font-jost"
            >
                <h1 className="text-secondary-200 text-center text-2xl mb-4">
                    Mute @{props.usernameToMute}
                </h1>

                <div className="grid grid-cols-2 mx-auto gap-x-8 gap-y-4">
                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('duration', {
                                required: 'Visibility is required',
                            })}
                            id="one-minute"
                            className="peer"
                            value="60"
                            required
                        />
                        <label
                            htmlFor="one-minute"
                            className="peer-checked:text-secondary-200"
                        >
                            1 minute
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('duration', {
                                required: 'Visibility is required',
                            })}
                            id="five-minutes"
                            className="peer"
                            value="300"
                            required
                        />
                        <label
                            htmlFor="five-minutes"
                            className="peer-checked:text-secondary-200"
                        >
                            5 minutes
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('duration', {
                                required: 'Visibility is required',
                            })}
                            id="ten-minutes"
                            className="peer"
                            value="600"
                            required
                        />
                        <label
                            htmlFor="ten-minutes"
                            className="peer-checked:text-secondary-200"
                        >
                            10 minutes
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('duration', {
                                required: 'Visibility is required',
                            })}
                            id="one-hour"
                            className="peer"
                            value="3600"
                            required
                        />
                        <label
                            htmlFor="one-hour"
                            className="peer-checked:text-secondary-200"
                        >
                            1 hour
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('duration', {
                                required: 'Visibility is required',
                            })}
                            id="one-day"
                            className="peer"
                            value="86400"
                            required
                        />
                        <label
                            htmlFor="one-day"
                            className="peer-checked:text-secondary-200"
                        >
                            1 day
                        </label>
                    </div>

                    <div className="flex justify-start gap-1">
                        <input
                            type="radio"
                            {...register('duration', {
                                required: 'Visibility is required',
                            })}
                            id="one-week"
                            className="peer"
                            value="604800"
                            required
                        />
                        <label
                            htmlFor="one-week"
                            className="peer-checked:text-secondary-200"
                        >
                            1 week
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-secondary-200
                            text-background
                            font-bold
                            w-40 py-1
                            rounded-2xl
                            self-center
                            mt-4"
                >
                    Mute
                </button>
            </form>
        </Modal>
    );
}
