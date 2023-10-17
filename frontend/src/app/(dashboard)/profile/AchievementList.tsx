'use client';
import { useContext } from 'react';
import EmptyAchievement from '../../../../public/images/empty-achievement.svg';
import Achievement from './Achievement';
import { UsersAchievements } from './data/ProfileData';
import { profileModalContext } from '@/contexts/contexts';

type AchievementListProps = {
    username: string;
};

export default function AchievementList({ username }: AchievementListProps) {
    const userAchievements = UsersAchievements.filter(
        (achievement) => achievement.username === username,
    );
    const slicedAchievements = userAchievements.slice(0, 3);
    const { setAchievements } = useContext(profileModalContext);

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
                    {slicedAchievements.map((achievement, idx) => {
                        return (
                            <div key={idx}>
                                <Achievement {...achievement} />
                                {idx < slicedAchievements.length - 1 && (
                                    <hr className="border-1 border-secondary-200 rounded-full" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {userAchievements.length > 3 && (
                    <button
                        className="flex items-center justify-center
                            text-sm text-white
                            bg-gradient-to-t from-[#881EDF] to-secondary-200
                            w-full h-8
                            rounded-b-2xl"
                        onClick={() => setAchievements(true)}
                    >
                        See All Achievements
                    </button>
                )}
            </div>
        </>
    );
}
