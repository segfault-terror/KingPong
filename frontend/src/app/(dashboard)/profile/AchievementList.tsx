'use client';
import { profileModalContext } from '@/contexts/contexts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import Achievement from './Achievement';
import Loading from '@/app/loading';
import { backendHost } from '@/app/globals';

type AchievementListProps = {
    username: string;
};

export default function AchievementList({ username }: AchievementListProps) {
    const { setAchievements } = useContext(profileModalContext);
    const { data, isLoading } = useQuery({
        queryKey: ['achievements', username],
        queryFn: async () => {
            const { data } = await axios.get(
                `${backendHost}/user/get/${username}/achievements`,
                {
                    withCredentials: true,
                },
            );
            return data;
        },
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    const slicedAchievements = data?.achievements.slice(0, 3);

    if (data?.achievements.length === 0) {
        return (
            <div
                className="bg-primary rounded-2xl p-2 h-full
                flex flex-col justify-center
                border-2 border-secondary-200"
            >
                <Achievement
                    title="No achievement yet"
                    description="Without failure there's no achievement"
                    type="empty"
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
                    {slicedAchievements.map((achievement: any, idx: number) => {
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

                {data?.achievements.length > 3 && (
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
