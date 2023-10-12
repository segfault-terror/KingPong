import { UserStatus } from '../../chat/DirectMessage';
import { Users, UsersStats } from './data/ProfileData';

export type UserCircleInfoProps = {
    username: string;
};

export default function UserCircleInfo({ username }: UserCircleInfoProps) {
    const user = Users.find((user) => user.username === username);
    const stats = UsersStats.find((stats) => stats.username === username);

    return (
        <div className="rounded-full w-24 h-24 md:w-32 md:h-32">
            <div className="rounded-full w-full h-full overflow-hidden">
                <img
                    src={user!.avatarPath}
                    alt="User Avatar"
                    className="rounded-full object-cover w-full h-full border-4 border-secondary-200"
                />
                <div
                    className="text-primary bg-secondary-200
                                text-center text-sm font-bold font-jost
                                h-[30%]
                                relative bottom-[20%]"
                >
                    {stats!.level}
                </div>
            </div>
            <div
                className={`${user!.status === UserStatus.Online && 'bg-online'}
                ${user!.status === UserStatus.Offline && 'bg-inactive-200'}
                ${user!.status === UserStatus.InGame && 'bg-ingame'}
                        relative bottom-[25%] left-[80%]
                        w-3 h-3 md:w-4 md:h-4 rounded-full`}
            ></div>
        </div>
    );
}
