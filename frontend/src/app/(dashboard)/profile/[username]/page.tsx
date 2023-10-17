import AchievementList from '../AchievementList';
import FullFriendList from '../FullFriendList';
import MatchHistory from '../MatchHistory';
import ProfileCard from '../ProfileCard';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default function ProfilePage({ params }: ProfilePageProps) {
    return (
        <>
            <div
                className="flex flex-col gap-2 mx-4 mt-20 mb-8
                            md:grid md:grid-cols-4 md:gap-3
                            lg:grid-cols-3
                            lg:max-w-5xl lg:mx-auto lg:my-40"
            >
                <div className="md:col-span-full">
                    <ProfileCard username={params.username} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <AchievementList username={params.username} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <FullFriendList username={params.username} />
                </div>
                <div className="md:col-start-2 md:col-end-4 lg:col-span-1">
                    <MatchHistory username={params.username} />
                </div>
            </div>
        </>
    );
}
