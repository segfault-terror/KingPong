import { UserStatus } from '@/components/DirectMessage';
import { AiOutlineBell } from 'react-icons/ai';
import AchievementGold from '../../../public/images/gold-achievement.svg';
import Logo from '../../components/Logo';
import Tommy from '../../stories/assets/1.jpeg';
import Archer from '../../stories/assets/2.jpeg';
import Moussa from '../../stories/assets/3.jpeg';
import AchievementList from './AchievementList';
import FullFriendList from './FullFriendList';
import MatchHistory from './MatchHistory';
import ProfileCard from './ProfileCard';
import GoldLeague from '../../../public/images/gold-league.svg';

export default function ProfilePage() {
    const achievements = [
        {
            title: 'First Win',
            description: 'Win your first game',
            image: AchievementGold.src,
        },
        {
            title: 'First Win',
            description: 'Win your first game',
            image: AchievementGold.src,
        },
        {
            title: 'First Win',
            description: 'Win your first game',
            image: AchievementGold.src,
        },
    ];
    const lastFriends = [
        {
            avatarPath: Archer.src,
            level: 99,
            status: UserStatus.Online,
        },
        {
            avatarPath: Tommy.src,
            level: 72,
            status: UserStatus.Online,
        },
        {
            avatarPath: Moussa.src,
            level: 64,
            status: UserStatus.Online,
        },
    ];
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
            <div className="flex flex-col gap-2 mx-4 mt-12 mb-8">
                <ProfileCard
                    userName="Archer"
                    avatarPath={Archer.src}
                    level={99}
                    status={UserStatus.Online}
                    league={GoldLeague.src}
                    wins={100}
                    losses={0}
                />
                <AchievementList achievements={achievements} />
                <FullFriendList lastFriends={lastFriends} />
                <MatchHistory gameResults={matchHistory} />
            </div>
        </>
    );
}
