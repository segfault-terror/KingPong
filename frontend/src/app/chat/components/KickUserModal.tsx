import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import Ghost from '../../../../public/lottie/ghost.json';

type KickUserProps = {
    channelName: string;
    setShowKickModal: (val: boolean) => void;
    isAdmin: boolean;
    setUsernameToKick: (val: string) => void;
    setShowKickDialog: (val: boolean) => void;
};

export default function KickUserModal({
    setShowKickModal: setShowKickModal,
    channelName,
    isAdmin,
    setUsernameToKick,
    setShowKickDialog,
}: KickUserProps) {
    const { data: channelMembers, isLoading } = useQuery({
        queryKey: ['channel', channelName, 'members'],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/chat/channel/${channelName}/members`,
                { withCredentials: true },
            );
            return data;
        },
    });

    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (!channelMembers?.members || !channelMembers?.admins) return;

        if (isAdmin) {
            console.log('Removing admins from ban list');
            channelMembers.admins = [];
        }

        setResults(
            filterMembers(channelMembers.members, channelMembers.admins, ''),
        );
    }, [channelMembers, isAdmin]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    function filterMembers(members: any[], admins: any[], query: string) {
        const filteredMembers = members.filter((member) => {
            return (
                member.username.toLowerCase().includes(query.toLowerCase()) ||
                member.fullname.toLowerCase().includes(query.toLowerCase())
            );
        });
        const filteredAdmins = admins.filter((admin) => {
            return (
                admin.username.toLowerCase().includes(query.toLowerCase()) ||
                admin.fullname.toLowerCase().includes(query.toLowerCase())
            );
        });
        return [
            ...filteredAdmins.map((admin) => {
                return { ...admin, isAdmin: true };
            }),
            ...filteredMembers.map((member) => {
                return { ...member, isAdmin: false };
            }),
        ];
    }

    return (
        <>
            <Modal
                onClose={() => setShowKickModal(false)}
                childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                    border-r border-l border-secondary-500 w-[90%] h-[300px]
                                    lg:w-2/3 max-w-[600px]"
            >
                <div
                    className="text-white accent-secondary-200
                flex flex-col gap-2 font-jost"
                >
                    <h1 className="text-secondary-200 text-center text-2xl mb-4">
                        Kick user
                    </h1>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Search"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                            }
                        }}
                        onChange={(event) => {
                            event.preventDefault();
                            const query = event.target.value;
                            const newResults = filterMembers(
                                channelMembers?.members,
                                channelMembers?.admins,
                                query,
                            );
                            setResults(newResults);
                        }}
                        className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1"
                    />
                    {results.length !== 0 && (
                        <ul
                            className="bg-primary border-[0.5px] border-secondary-200 p-2 max-h-36
							overflow-y-scroll scrollbar-thumb-secondary-200 scrollbar-thin"
                        >
                            {results.map((result, idx) => (
                                <button
                                    onClick={() => {
                                        setShowKickModal(false);
                                        setUsernameToKick(result.username);
                                        setShowKickDialog(true);
                                    }}
                                    key={idx}
                                    className="hover:bg-background/80 hover:rounded-xl block w-full text-left py-1"
                                >
                                    <li className="flex items-center gap-4 pr-4">
                                        <img
                                            src={result.avatar}
                                            alt={`${result.username}'s profile picture`}
                                            className="w-12 h-12 rounded-full object-cover
                                        border-[1px] border-secondary-200 font-jost flex-shrink-0"
                                        />
                                        <div className="flex flex-col flex-grow">
                                            <p>{result.fullname}</p>
                                            <p className="text-secondary-200 italic">
                                                @{result.username}
                                            </p>
                                        </div>
                                        <div className="font-mulish italic">
                                            {result.isAdmin && 'Admin'}
                                        </div>
                                    </li>
                                </button>
                            ))}
                        </ul>
                    )}
                    {channelMembers?.admins.length === 0 &&
                        channelMembers?.members.length === 0 && (
                            <>
                                <div className="w-[20%] mx-auto">
                                    <Lottie animationData={Ghost} loop={true} />
                                </div>
                                <p className="text-center text-lg font-jost">
                                    No users to kick
                                </p>
                            </>
                        )}
                </div>
            </Modal>
        </>
    );
}
