import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import { modalContext } from '@/contexts/contexts';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

export default function UnbanDialog(props: {
    channelName: string;
    usernameToUnban: string;
    setShowUnbanDialog: (val: boolean) => void;
}) {
    const { setDotsDropdown } = useContext(modalContext);

    const { mutate: unbanUser, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post(
                `/api/chat/channel/${props.channelName}/unban`,
                { withCredentials: true, ...args },
            );
        },
    });

    const { socket } = useSocket();

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <Modal
            onClose={() => props.setShowUnbanDialog(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                border-r border-l border-secondary-500
                                w-[90%] max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Un-ban user{' '}
                <span className="text-secondary-200">
                    @{props.usernameToUnban}
                </span>
                ?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Un-ban user"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        unbanUser({
                            usernameToUnban: props.usernameToUnban,
                        });
                        props.setShowUnbanDialog(false);
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
                    onClick={() => props.setShowUnbanDialog(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
