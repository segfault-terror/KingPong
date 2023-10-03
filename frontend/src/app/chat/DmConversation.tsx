import { createContext, useContext } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { UserStatus, getStatusColor } from './DirectMessage';

type DmConversationProps = {
    userImg: string;
    userName: string;
    userStatus: UserStatus;
};

const DmContext = createContext<DmConversationProps>({} as DmConversationProps);

export default function DmConversation({
    userImg,
    userName,
    userStatus,
}: DmConversationProps) {
    return (
        <DmContext.Provider value={{ userImg, userName, userStatus }}>
            <DmConversationHeader />
        </DmContext.Provider>
    );
}

function getStatusMsg(status: UserStatus) {
    switch (status) {
        case UserStatus.Online:
            return 'online';
        case UserStatus.Offline:
            return 'offline';
        case UserStatus.InGame:
            return 'in game';
        default:
            throw new Error('Invalid user status');
    }
}

function DmConversationHeader() {
    return (
        <div className="flex justify-between items-center">
            <UserDMInfo />
            <button>
                <HiDotsVertical className="text-secondary-200 h-8 w-8" />
            </button>
        </div>
    );
}

function UserDMInfo() {
    const { userImg, userName, userStatus } = useContext(DmContext);
    const statusColor = getStatusColor(userStatus);
    const statusMsg = getStatusMsg(userStatus);

    return (
        <div className="flex items-center gap-3">
            <img
                src={userImg}
                alt={`${userName}'s avatar`}
                className="w-16 h-16 object-cover border-[3px] border-secondary-200 rounded-full"
            />

            <div>
                <h1 className="text-white text-lg font-bold">{userName}</h1>
                <div className="flex items-center gap-1">
                    <div
                        className={`w-3 h-3 rounded-full ${statusColor}`}
                    ></div>
                    <p className="text-white text-xs">{statusMsg}</p>
                </div>
            </div>
        </div>
    );
}
