import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type LeaveChannelProps = {
    channelName: string;
    setShowLeaveModal: (val: boolean) => void;
    setRedirectChannel: (val: boolean) => void;
};

export default function LeaveChannelModal(props: LeaveChannelProps) {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    const { mutate: leaveChannel, isLoading } = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/chat/channel/leave/${props.channelName}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            props.setRedirectChannel(true);
            queryClient.invalidateQueries(['channel', props.channelName, 'members'], {
                exact: true,
            });
            socket?.emit('update-channel-sidebar', props.channelName);
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
            onClose={() => props.setShowLeaveModal(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Leave channel{' '}
                <span className="text-secondary-200">{props.channelName}</span>?
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
                        leaveChannel();
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                    onClick={() => props.setShowLeaveModal(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
