import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function UnmuteDialog(props: {
    channelName: string;
    usernameToUnmute: string;
    setShowUnmuteDialog: (val: boolean) => void;
}) {
    const queryClient = useQueryClient();
    const { mutate: banUser, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post(
                `/api/chat/channel/${props.channelName}/unmute`,
                { withCredentials: true, ...args },
            );
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
            onClose={() => props.setShowUnmuteDialog(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Un-mute user{' '}
                <span className="text-secondary-200">
                    @{props.usernameToUnmute}
                </span>
                ?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Leave channel"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        banUser({
                            usernameToUnmute: props.usernameToUnmute,
                        });
                        props.setShowUnmuteDialog(false);
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                    onClick={() => props.setShowUnmuteDialog(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
