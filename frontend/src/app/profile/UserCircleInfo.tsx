/* eslint-disable @next/next/no-img-element */
import { UserStatus } from '../../components/DirectMessage';

type UserCircleInfoProps = {
    avatarPath: string;
    level: number;
    status: UserStatus;
};

export default function UserCircleInfo({
    avatarPath,
    level,
    status,
}: UserCircleInfoProps) {
    return (
        <div className="rounded-full w-24 h-24">
            <div className="rounded-full w-full h-full overflow-hidden">
                <img
                    src={avatarPath}
                    alt="User Avatar"
                    className="rounded-full object-cover w-full h-full border-4 border-secondary-200"
                />
                <div
                    className="text-primary bg-secondary-200
                                text-center text-sm font-bold font-jost
                                h-[30%]
                                relative bottom-[20%]"
                >
                    {level}
                </div>
            </div>
            <div
                className={`${status === UserStatus.Online && 'bg-online'}
                ${status === UserStatus.Offline && 'bg-inactive-200'}
                ${status === UserStatus.InGame && 'bg-ingame'}
                        relative bottom-[25%] left-[80%]
                        w-3 h-3 rounded-full`}
            ></div>
        </div>
    );
}
