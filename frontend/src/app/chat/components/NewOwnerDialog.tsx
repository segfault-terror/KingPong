import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { modalContext } from '@/contexts/contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

export default function SetNewOwnerDialog(props: {
    channelName: string;
    newOwnerUsername: string;
    setShowNewOwnerDialog: (val: boolean) => void;
}) {
    const { setDotsDropdown } = useContext(modalContext);

    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const { mutate: changeOwner, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post('/api/chat/channel/change-owner', {
                withCredentials: true,
                ...args,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                'channel',
                props.channelName,
                'members',
            ]);
            queryClient.invalidateQueries(['channel', props.channelName], {
                exact: true,
            });
            socket?.emit('update-channel-sidebar', props.channelName);
            socket?.emit('new-owner', props.channelName);
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
            onClose={() => props.setShowNewOwnerDialog(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                border-r border-l border-secondary-500
                                w-[90%] max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Transfer ownership to{' '}
                <span className="text-secondary-200">
                    @{props.newOwnerUsername}
                </span>
                ?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Set new owner"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        changeOwner({
                            channelName: props.channelName,
                            newOwner: props.newOwnerUsername,
                        });
                        props.setShowNewOwnerDialog(false);
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
                    onClick={() => {
                        props.setShowNewOwnerDialog(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
