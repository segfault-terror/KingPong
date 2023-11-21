import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type DeleteChannelProps = {
    channelName: string;
    setShowDeleteModal: (val: boolean) => void;
    setRedirectChannel: (val: boolean) => void;
};

export default function DeleteChannelModal(props: DeleteChannelProps) {
    const { socket } = useSocket();
    const { mutate: deleteChannel, isLoading } = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/chat/channel/${props.channelName}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            props.setRedirectChannel(true);
            socket?.emit('channel-deleted', props.channelName);
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
            onClose={() => props.setShowDeleteModal(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                border-r border-l border-secondary-500
                                w-[90%] max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Delete channel{' '}
                <span className="text-secondary-200">{props.channelName}</span>?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Delete channel"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        deleteChannel();
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
                    onClick={() => props.setShowDeleteModal(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
