import GoldLeague from '../../../../../public/images/gold-league.svg';
import Archer from '../../../../stories/assets/2.jpeg';
import Moussa from '../../../../stories/assets/3.jpeg';
import AchievementList from '../AchievementList';
import FullFriendList from '../FullFriendList';
import MatchHistory from '../MatchHistory';
import ProfileCard from '../ProfileCard';
import { Users, UsersStats } from '../data/ProfileData';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default function ProfilePage({ params }: ProfilePageProps) {
    const currentUser = Users.find((user) => user.username === params.username);

    return (
        <>
            <div
                className="flex flex-col gap-2 mx-4 mt-20 mb-8
                            md:grid md:grid-cols-4 md:gap-3
                            lg:grid-cols-3
                            lg:max-w-5xl lg:mx-auto"
            >
                <div className="md:col-span-full">
                    <ProfileCard username={currentUser!.username} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <AchievementList username={currentUser!.username} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <FullFriendList username={currentUser!.username} />
                </div>
                <div className="md:col-start-2 md:col-end-4 lg:col-span-1">
                    <MatchHistory username={currentUser!.username} />
                </div>
            </div>
        </>
    );
}
