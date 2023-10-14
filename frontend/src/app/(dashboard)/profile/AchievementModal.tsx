import Achievement from './Achievement';
import { UsersAchievements } from './data/ProfileData';

type AchievementModalProps = {
    userName: string;
};

export default function AchievementModal({ userName }: AchievementModalProps) {
    const userAchievements = UsersAchievements.filter(
        (achievement) => achievement.username === userName,
    );

    return (
        <div className="p-2 lg:flex lg:flex-col lg:gap-2">
            {userAchievements.map((achievement, idx) => {
                return (
                    <div key={idx}>
                        <Achievement {...achievement} />
                        {idx < userAchievements.length - 1 && (
                            <hr className="border-1 border-secondary-200 rounded-full" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
