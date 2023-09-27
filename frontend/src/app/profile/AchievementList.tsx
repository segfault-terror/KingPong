import Achievement, { AchievementProps } from './Achievement';
import EmptyAchievement from '../../../public/images/empty-achievement.svg';

export type AchievementListProps = {
    achievements: AchievementProps[];
};

export default function AchievementList({
    achievements,
}: AchievementListProps) {
    if (achievements.length === 0) {
        return (
            <div className="bg-primary bg-opacity-80 rounded-2xl p-2">
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
            <div className="bg-primary bg-opacity-80 rounded-2xl h-full flex flex-col justify-between">
                <div className="p-2">
                    {achievements.map((achievement, idx) => {
                        return (
                            <>
                                <Achievement key={idx} {...achievement} />
                                {idx < achievements.length - 1 && (
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
