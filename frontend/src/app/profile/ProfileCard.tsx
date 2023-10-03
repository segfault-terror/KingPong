import { AiFillTrophy, AiOutlineClose } from 'react-icons/ai';
import { TbMessage2, TbUserPlus, TbUserX } from 'react-icons/tb';
import { UserStatus } from '../chat/DirectMessage';
import UserCircleInfo from './UserCircleInfo';

type ProfileCardProps = {
    userName: string;
    avatarPath: string;
    level: number;
    status: UserStatus;
    league: string;
    wins: number;
    losses: number;
};

export default function ProfileCard({
    userName,
    avatarPath,
    level,
    status,
    league,
    wins,
    losses,
}: ProfileCardProps) {
    return (
        <div
            className="bg-primary bg-opacity-90
            border-2 border-secondary-200 rounded-3xl
            h-28 md:h-32
            flex flex-col justify-between"
        >
            <div className="flex items-start relative">
                <div className="absolute bottom-0 md:-bottom-2">
                    <UserCircleInfo
                        avatarPath={avatarPath}
                        level={level}
                        status={status}
                    />
                </div>
                <div className="flex items-center justify-between pt-2 pl-1 ml-24 md:ml-32">
                    <h1 className="text-secondary-200 font-mulish font-bold text-xl md:text-2xl">
                        {userName}
                    </h1>
                    <img src={league} alt="League" className="ml-2" />
                </div>
            </div>

            <div className="m-4 text-xl flex justify-between">
                <div className="flex gap-1 items-center md:text-2xl">
                    <div className="flex items-center text-online">
                        <AiFillTrophy />
                        <span>{wins}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                        <AiOutlineClose />
                        <span>{losses}</span>
                    </div>
                </div>

                <div className="flex gap-4 text-secondary-200 items-center md:text-2xl">
                    <TbMessage2 />
                    <TbUserPlus />
                    <TbUserX />
                </div>
            </div>
        </div>
    );
}
