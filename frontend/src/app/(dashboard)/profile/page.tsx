import { UserStatus } from '@/app/chat/DirectMessage';
import { AiOutlineBell } from 'react-icons/ai';
import AchievementGold from '../../../../public/images/gold-achievement.svg';
import Logo from '../../../components/Logo';
import AchievementList from './AchievementList';
import FullFriendList from './FullFriendList';
import MatchHistory from './MatchHistory';
import ProfileCard from './ProfileCard';
import GoldLeague from '../../../../public/images/gold-league.svg';
import Tommy from '../../../stories/assets/1.jpeg';
import Archer from '../../../stories/assets/2.jpeg';
import Moussa from '../../../stories/assets/3.jpeg';

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
            avatarPath: Tommy.src,
            level: 1,
            status: UserStatus.Online,
        },
        {
            avatarPath: Tommy.src,
            level: 1,
            status: UserStatus.Online,
        },
        {
            avatarPath: Tommy.src,
            level: 1,
            status: UserStatus.Online,
        },
    ];
    const gameResults = [
        {
            playerAvatar: Archer.src,
            opponentAvatar: Moussa.src,
            playerLevel: 1,
            opponentLevel: 1,
            playerScore: 11,
            opponentScore: 9,
        },
        {
            playerAvatar: Archer.src,
            opponentAvatar: Moussa.src,
            playerLevel: 1,
            opponentLevel: 1,
            playerScore: 11,
            opponentScore: 9,
        },
        {
            playerAvatar: Archer.src,
            opponentAvatar: Moussa.src,
            playerLevel: 1,
            opponentLevel: 1,
            playerScore: 11,
            opponentScore: 9,
        },
    ];

    return (
        <>
            <div
                className="flex flex-col gap-2 mx-4 mt-20 mb-8
                            md:grid md:grid-cols-4 md:gap-3
                            lg:grid-cols-3
                            lg:max-w-5xl lg:mx-auto"
            >
                <div className="md:col-span-full">
                    <ProfileCard
                        userName="Archer"
                        avatarPath={Archer.src}
                        level={1}
                        status={UserStatus.Online}
                        league={GoldLeague.src}
                        wins={0}
                        losses={0}
                    />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <AchievementList achievements={achievements} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <FullFriendList lastFriends={lastFriends} />
                </div>
                <div className="md:col-start-2 md:col-end-4 lg:col-span-1">
                    <MatchHistory gameResults={gameResults} />
                </div>
            </div>
        </>
    );
}
