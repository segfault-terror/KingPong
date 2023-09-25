import Achievement, { AchievementProps } from './Achievement';

export type AchievementListProps = {
    achievements: AchievementProps[];
};

export default function AchievementList({
    achievements,
}: AchievementListProps) {
    return (
        <>
            <div className="bg-primary bg-opacity-80 rounded-2xl">
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
