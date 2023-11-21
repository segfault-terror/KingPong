import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { modalContext } from '@/contexts/contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

export default function BanDialog(props: {
    channelName: string;
    usernameToBan: string;
    setShowBanDialog: (val: boolean) => void;
}) {
    const { setDotsDropdown } = useContext(modalContext);
    const { socket } = useSocket();

    const queryClient = useQueryClient();
    const { mutate: banUser, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post(
                `/api/chat/channel/${props.channelName}/ban`,
                { withCredentials: true, ...args },
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                'channel',
                props.channelName,
                'members',
            ]);
            socket?.emit('redirect-to-chat', {
                channel: props.channelName,
                username: props.usernameToBan,
                reason: 'ban',
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
            onClose={() => props.setShowBanDialog(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                border-r border-l border-secondary-500
                                w-[90%] max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Ban user{' '}
                <span className="text-secondary-200">
                    @{props.usernameToBan}
                </span>
                ?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Ban user"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        banUser({
                            usernameToBan: props.usernameToBan,
                        });
                        props.setShowBanDialog(false);
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
                    onClick={() => props.setShowBanDialog(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
