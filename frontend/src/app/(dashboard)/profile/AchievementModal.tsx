
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Achievement from './Achievement';
import Loading from '@/app/loading';

type AchievementModalProps = {
    userName: string;
};

export default function AchievementModal({ userName }: AchievementModalProps) {
    const { data: user, isLoading } = useQuery({
        queryKey: ['achievements', userName],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/user/get/${userName}/achievements`,
                {
                    withCredentials: true,
                },
            );
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <div className="p-2 lg:flex lg:flex-col lg:gap-2">
            {user.achievements.map((achievement: any, idx: number) => {
                return (
                    <div key={achievement.id}>
                        <Achievement {...achievement} />
                        {idx < user.length - 1 && (
                            <hr className="border-1 border-secondary-200 rounded-full" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
