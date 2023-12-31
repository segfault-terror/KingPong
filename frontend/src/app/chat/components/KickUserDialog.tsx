import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { modalContext } from '@/contexts/contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

export default function KickDialog(props: {
    channelName: string;
    usernameToKick: string;
    setShowKickDialog: (val: boolean) => void;
}) {
    const queryClient = useQueryClient();

    const { socket } = useSocket();
    const { setDotsDropdown } = useContext(modalContext);

    const { mutate: kickUser, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post(
                `/api/chat/channel/${props.channelName}/kick`,
                { withCredentials: true, ...args },
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                'channel',
                props.channelName,
                'members',
            ]);
            socket?.emit('update-channel-sidebar', props.channelName);
            socket?.emit('redirect-to-chat', {
                channel: props.channelName,
                username: props.usernameToKick,
                reason: 'kick',
            });
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
            onClose={() => props.setShowKickDialog(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                border-r border-l border-secondary-500
                                w-[90%] max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Kick user{' '}
                <span className="text-secondary-200">
                    @{props.usernameToKick}
                </span>
                ?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Kick user"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        kickUser({
                            usernameToKick: props.usernameToKick,
                        });
                        props.setShowKickDialog(false);
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
                    onClick={() => props.setShowKickDialog(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
