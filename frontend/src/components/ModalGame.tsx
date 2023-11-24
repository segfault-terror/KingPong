import { useSocket } from '@/contexts/SocketContext';
import useInvite from '@/hooks/useInvite';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from './Modal';

export function InviteGameModal({
    username,
    avatar,
    id,
    setHidden,
    sender,
    senderId,
	socket,
}: {
    username: string;
    sender: string;
    avatar: string;
    id: string;
    setHidden: any;
    senderId: string;
	socket: any;
}) {
    const { mutate: createNotification } = useInvite();
    const [Challenge, setChallenge] = useState(false);
    const [myId, setId] = useState(id);

    useEffect(() => {
        if (Challenge) redirect(`/game/ranked/normal/${id}`);
    }, [Challenge, id]);

    return (
        <Modal
            onClose={() => setHidden(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r-2 border-l-2 border-secondary-500 w-[90%]
                    max-w-[400px] h-44 flex flex-col justify-evenly"
        >
            <h1 className="text-center text-xl font-jost">
                Invite <span className="text-secondary-200">@{sender}</span>{' '}
                to a game?
                <p className="text-lg font-jockey text-red-500">
                    {' '}
                    you will redirect to the game page !
                </p>
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Invite"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        if (!Challenge) {
                            setId(myId);
                            setTimeout(() => {
                                createNotification({
                                    id: senderId,
                                    type: 'GAME',
                                    ChallengeId: myId,
                                });
                                socket?.emit('notifications', username);
                                socket?.emit('notif', {
                                    sender: sender,
                                    username: username,
                                    type: 'GAME',
                                    avatar: avatar,
                                    ChallengeId: myId,
                                });
                                setChallenge(true);
                            }, 2000);
                        }
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                    onClick={() => setHidden(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
