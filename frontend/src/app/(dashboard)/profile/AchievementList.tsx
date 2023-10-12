import EmptyAchievement from '../../../../public/images/empty-achievement.svg';
import Achievement from './Achievement';
import { UsersAchievements } from './data/ProfileData';

type AchievementListProps = {
    username: string;
};

export default function AchievementList({ username }: AchievementListProps) {
    const userAchievements = UsersAchievements.filter(
        (achievement) => achievement.username === username,
    );

    if (userAchievements.length === 0) {
        return (
            <div
                className="bg-primary rounded-2xl p-2 h-full
                flex flex-col justify-center
                border-2 border-secondary-200"
            >
                <Achievement
                    title="No achievement yet"
                    description="Without failure there's no achievement"
                    image={EmptyAchievement.src}
                />
            </div>
        );
    }

    return (
        <>
            <div
                className="bg-primary rounded-2xl h-full
                            flex flex-col justify-between
                            border-2 border-secondary-200"
            >
                <div className="p-2 lg:flex lg:flex-col lg:gap-2">
                    {userAchievements.map((achievement, idx) => {
                        return (
                            <>
                                <Achievement key={idx} {...achievement} />
                                {idx < userAchievements.length - 1 && (
                                    <hr className="border-1 border-secondary-200 rounded-full" />
                                )}
                            </>
                        );
                    })}
                </div>
                <div
                    className="flex items-center justify-center
                            text-sm text-white
                            bg-gradient-to-t from-[#881EDF] to-secondary-200
                            w-full h-8
                            rounded-b-2xl"
                >
                    See All Achievements
                </div>
            </div>
        </>
    );
}
