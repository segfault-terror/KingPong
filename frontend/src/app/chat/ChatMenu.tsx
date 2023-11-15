'use client';

import Modal from '@/components/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { ReactNode, useEffect, useState } from 'react';
import Loading from '../loading';
import DeleteChannelModal from './components/DeleteChannelModal';
import EditChannelModal from './components/EditChannelModal';
import LeaveChannelModal from './components/LeaveChannel';
import SetNewOwnerDialog from './components/NewOwnerDialog';
import NewOwnerModal from './components/NewOwnerModal';
import BanUserModal from './components/BanUserModal';
import BanDialog from './components/BanUserDialog';
import UnbanUserModal from './components/UnbanUserModal';
import UnbanDialog from './components/UnbanUserDialog';
import KickUserModal from './components/KickUserModal';
import KickDialog from './components/KickUserDialog';
import MuteUserModal from './components/MuteUserModal';
import MuteUserForm from './components/MuteUserForm';
import UnmuteUserModal from './components/UnmuteUserModal';
import UnmuteDialog from './components/UnmuteUserDialog';
import NewAdminModal from './components/NewAdminModal';
import SetNewAdminDialog from './components/NewAdminDialog';

export default function ChatMenu() {
    const pathname = usePathname();
    const currentPage = path.basename(pathname);

    if (currentPage === 'chat') return null;

    return (
        <ul
            className="w-36 p-2 text-center bg-background
                        flex flex-col gap-2
                        border-[1px] border-secondary-200 rounded-2xl"
        >
            {pathname.startsWith('/chat/dm') && (
                <DmMenu username={currentPage} />
            )}
            {pathname.startsWith('/chat/channel') && (
                <ChannelMenu channelName={currentPage} />
            )}
        </ul>
    );
}

function ChatMenuItem(props: { children: ReactNode }) {
    return (
        <li className="text-silver hover:bg-primary hover:rounded-xl py-1">
            {props.children}
        </li>
    );
}

function DmMenu(props: { username: string }) {
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const { data: dm, isLoading: dmIsLoding } = useQuery({
        queryFn: async () => {
            const { data: dm } = await axios.get(
                `/api/chat/dm/${props.username}`,
                {
                    withCredentials: true,
                },
            );
            return dm;
        },
    });

    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isLoading: mutationIsLoading } = useMutation({
        mutationFn: async () => {
            return await axios.delete(`/api/chat/dm/${dm.id}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['dm', props.username], {
                exact: true,
            });
            queryClient.invalidateQueries(['dms', 'brief'], { exact: true });
        },
    });

    if (dmIsLoding || mutationIsLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {showClearConfirm && (
                <Modal
                    onClose={() => setShowClearConfirm(false)}
                    childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
                >
                    <h1 className="text-center text-xl font-jost">
                        Clear chat with{' '}
                        <span className="text-secondary-200">
                            @{props.username}
                        </span>
                        ?
                    </h1>
                    <div className="w-full flex justify-center gap-4 pt-4">
                        <button
                            className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                            onClick={() => {
                                mutate();
                                router.replace('/chat');
                            }}
                        >
                            OK
                        </button>
                        <button
                            className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                            onClick={() => setShowClearConfirm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
            <ChatMenuItem>
                <Link href={`/profile/${props.username}`}>View Profile</Link>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Invite to Game</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Block</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button
                    className="text-[red]"
                    onClick={() => setShowClearConfirm(true)}
                >
                    Clear Chat
                </button>
            </ChatMenuItem>
        </>
    );
}

function ChannelMenu(props: { channelName: string }) {
    const { data: channel, isLoading: channelIsLoading } = useQuery({
        queryKey: ['channel', props.channelName],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/chat/channel/${props.channelName}`,
                { withCredentials: true },
            );
            return data;
        },
    });

    const { data: me, isLoading: meIsLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            return data;
        },
    });

    const [redirectChannel, setRedirectChannel] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showNewOwnerModal, setShowNewOwnerModal] = useState(false);
    const [showNewOwnerDialog, setShowNewOwnerDialog] = useState(false);
    const [newOwnerUsername, setNewOwnerUsername] = useState('');
    const [showEditChannelModal, setShowEditChannelModal] = useState(false);
    const [showBanModal, setShowBanModal] = useState(false);
    const [showBanDialog, setShowBanDialog] = useState(false);
    const [usernameToBan, setUsernameToBan] = useState('');
    const [showUnbanModal, setShowUnbanModal] = useState(false);
    const [showUnbanDialog, setShowUnbanDialog] = useState(false);
    const [usernameToUnban, setUsernameToUnban] = useState('');
    const [showKickModal, setShowKickModal] = useState(false);
    const [showKickDialog, setShowKickDialog] = useState(false);
    const [usernameToKick, setUsernameToKick] = useState('');
    const [showMuteModal, setShowMuteModal] = useState(false);
    const [showMuteForm, setShowMuteForm] = useState(false);
    const [usernameToMute, setUsernameToMute] = useState('');
    const [showUnmuteModal, setShowUnmuteModal] = useState(false);
    const [showUnmuteDialog, setShowUnmuteDialog] = useState(false);
    const [usernameToUnmute, setUsernameToUnmute] = useState('');
    const [showSetNewAdminModal, setShowSetNewAdminModal] = useState(false);
    const [showNewAdminDialog, setShowNewAdminDialog] = useState(false);
    const [newAdminUsername, setNewAdminUsername] = useState('');

    useEffect(() => {
        if (!redirectChannel) return;
        redirect('/chat');
    }, [redirectChannel]);

    if (channelIsLoading || meIsLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    const isOwner = channel?.owner.username === me?.username;
    const isAdmin = channel?.admins.some(
        (admin: any) => admin.username === me?.username,
    );

    return (
        <>
            {showLeaveModal && (
                <LeaveChannelModal
                    channelName={props.channelName}
                    setShowLeaveModal={setShowLeaveModal}
                    setRedirectChannel={setRedirectChannel}
                />
            )}

            {showDeleteModal && (
                <DeleteChannelModal
                    channelName={props.channelName}
                    setShowDeleteModal={setShowDeleteModal}
                    setRedirectChannel={setRedirectChannel}
                />
            )}

            {showNewOwnerModal && (
                <NewOwnerModal
                    channelName={props.channelName}
                    setShowNewOwnerModal={setShowNewOwnerModal}
                    setShowNewOwnerDialog={setShowNewOwnerDialog}
                    setNewOwnerUsername={setNewOwnerUsername}
                />
            )}

            {showNewOwnerDialog && (
                <SetNewOwnerDialog
                    channelName={props.channelName}
                    newOwnerUsername={newOwnerUsername}
                    setShowNewOwnerDialog={setShowNewOwnerDialog}
                />
            )}

            {showEditChannelModal && (
                <EditChannelModal
                    channelName={props.channelName}
                    channelType={channel?.type}
                    setShowEditChannelModal={setShowEditChannelModal}
                />
            )}

            {showBanModal && (
                <BanUserModal
                    setShowBanModal={setShowBanModal}
                    channelName={props.channelName}
                    isAdmin={isAdmin}
                    setUsernameToBan={setUsernameToBan}
                    setShowBanDialog={setShowBanDialog}
                />
            )}

            {showBanDialog && (
                <BanDialog
                    channelName={props.channelName}
                    setShowBanDialog={setShowBanDialog}
                    usernameToBan={usernameToBan}
                />
            )}

            {showUnbanModal && (
                <UnbanUserModal
                    channelName={props.channelName}
                    setShowUnbanModal={setShowUnbanModal}
                    setShowUnbanDialog={setShowUnbanDialog}
                    setUsernameToUnban={setUsernameToUnban}
                />
            )}

            {showUnbanDialog && (
                <UnbanDialog
                    channelName={props.channelName}
                    setShowUnbanDialog={setShowUnbanDialog}
                    usernameToUnban={usernameToUnban}
                />
            )}

            {showKickModal && (
                <KickUserModal
                    channelName={props.channelName}
                    setShowKickModal={setShowKickModal}
                    isAdmin={isAdmin}
                    setShowKickDialog={setShowKickDialog}
                    setUsernameToKick={setUsernameToKick}
                />
            )}

            {showKickDialog && (
                <KickDialog
                    channelName={props.channelName}
                    usernameToKick={usernameToKick}
                    setShowKickDialog={setShowKickDialog}
                />
            )}

            {showMuteModal && (
                <MuteUserModal
                    channelName={props.channelName}
                    setShowMuteModal={setShowMuteModal}
                    setShowMuteDialog={setShowMuteForm}
                    setUsernameToMute={setUsernameToMute}
                />
            )}

            {showMuteForm && (
                <MuteUserForm
                    channelName={props.channelName}
                    usernameToMute={usernameToMute}
                    setShowMuteUserForm={setShowMuteForm}
                />
            )}

            {showUnmuteModal && (
                <UnmuteUserModal
                    channelName={props.channelName}
                    setShowUnmuteModal={setShowUnmuteModal}
                    setUsernameToUnmute={setUsernameToUnmute}
                    setShowUnmuteDialog={setShowUnmuteDialog}
                />
            )}

            {showUnmuteDialog && (
                <UnmuteDialog
                    channelName={props.channelName}
                    usernameToUnmute={usernameToUnmute}
                    setShowUnmuteDialog={setShowUnmuteDialog}
                />
            )}
            {showSetNewAdminModal && (
                <NewAdminModal
                    channelName={props.channelName}
                    setShowNewAdminModal={setShowSetNewAdminModal}
                    setShowNewAdminDialog={setShowNewAdminDialog}
                    setNewAdminUsername={setNewAdminUsername}
                />
            )}
            {showNewAdminDialog && (
                <SetNewAdminDialog
                    channelName={props.channelName}
                    newAdminUsername={newAdminUsername}
                    setShowNewAdminDialog={setShowNewAdminDialog}
                />
            )}

            {isOwner && (
                <ChatMenuItem>
                    <button onClick={() => setShowDeleteModal(true)}>
                        Delete channel
                    </button>
                </ChatMenuItem>
            )}

            {!isOwner && (
                <ChatMenuItem>
                    <button onClick={() => setShowLeaveModal(true)}>
                        Leave channel
                    </button>
                </ChatMenuItem>
            )}

            {isOwner && (
                <ChatMenuItem>
                    <button onClick={() => setShowNewOwnerModal(true)}>
                        Set new owner
                    </button>
                </ChatMenuItem>
            )}
            {isOwner && (
                <ChatMenuItem>
                    <button onClick={() => setShowEditChannelModal(true)}>
                        Edit channel
                    </button>
                </ChatMenuItem>
            )}
            {(isOwner || isAdmin) && (
                <ChatMenuItem>
                    <button onClick={() => setShowBanModal(true)}>
                        Ban user
                    </button>
                </ChatMenuItem>
            )}
            {(isOwner || isAdmin) && (
                <ChatMenuItem>
                    <button onClick={() => setShowUnbanModal(true)}>
                        Un-ban user
                    </button>
                </ChatMenuItem>
            )}
            {(isOwner || isAdmin) && (
                <ChatMenuItem>
                    <button onClick={() => setShowKickModal(true)}>
                        Kick user
                    </button>
                </ChatMenuItem>
            )}
            {(isOwner || isAdmin) && (
                <ChatMenuItem>
                    <button onClick={() => setShowMuteModal(true)}>
                        Mute user
                    </button>
                </ChatMenuItem>
            )}
            {(isOwner || isAdmin) && (
                <ChatMenuItem>
                    <button onClick={() => setShowUnmuteModal(true)}>
                        Un-mute user
                    </button>
                </ChatMenuItem>
            )}
            {isOwner && (
                <ChatMenuItem>
                    <button onClick={() => setShowSetNewAdminModal(true)}>
                        Set new admin
                    </button>
                </ChatMenuItem>
            )}
        </>
    );
}
