import Logo from '../../components/Logo';
import { AiOutlineBell } from 'react-icons/ai';
import UserCircleInfo from './UserCircleInfo';

import Archer from '../../stories/assets/2.jpeg';
import { UserStatus } from '@/components/DirectMessage';
import MatchHistory from './MatchHistory';

export default function ProfilePage() {
    const matchHistory = [
        {
            playerAvatar: Archer.src,
            opponentAvatar: Archer.src,
            playerLevel: 72,
            opponentLevel: 84,
            playerScore: 3,
            opponentScore: 11,
        },
        {
            playerAvatar: Archer.src,
            opponentAvatar: Archer.src,
            playerLevel: 72,
            opponentLevel: 84,
            playerScore: 3,
            opponentScore: 11,
        },
        {
            playerAvatar: Archer.src,
            opponentAvatar: Archer.src,
            playerLevel: 72,
            opponentLevel: 84,
            playerScore: 3,
            opponentScore: 11,
        },
    ];

    return (
        <>
            <div className="p-4 flex justify-between items-center">
                <Logo mylogo="/images/logo.svg" className="w-1/2" />
                <AiOutlineBell className="text-secondary-200 text-3xl" />
            </div>
            <UserCircleInfo
                avatarPath={Archer.src}
                level={100}
                status={UserStatus.Online}
            />
            <MatchHistory gameResults={matchHistory} />
        </>
    );
}
