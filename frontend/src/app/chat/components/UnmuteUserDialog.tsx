import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { modalContext } from '@/contexts/contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

export default function UnmuteDialog(props: {
    channelName: string;
    usernameToUnmute: string;
    setShowUnmuteDialog: (val: boolean) => void;
}) {
    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const { setDotsDropdown } = useContext(modalContext);

    const { mutate: banUser, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post(
                `/api/chat/channel/${props.channelName}/unmute`,
                { withCredentials: true, ...args },
            );
        },
        onSuccess: () => {
            socket?.emit('mute', props.usernameToUnmute);
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
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                border-r border-l border-secondary-500
                                w-[90%] max-w-[400px]"
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
                    title="Un-mute user"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        banUser({
                            usernameToUnmute: props.usernameToUnmute,
                        });
                        props.setShowUnmuteDialog(false);
                        setDotsDropdown(false);
                    }}
                >
                    OK
                </button>
                <button
                    title="Cancel"
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
