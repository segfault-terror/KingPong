import { AiFillTrophy, AiOutlineClose } from 'react-icons/ai';
import { TbMessage2, TbUserPlus, TbUserX } from 'react-icons/tb';
import { UserStatus } from '../../components/DirectMessage';
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
            className="bg-primary bg-opacity-80
            border-2 border-secondary-200 rounded-3xl
            h-28
            flex flex-col justify-between"
        >
            <div className="flex items-start relative">
                <div className="absolute bottom-0">
                    <UserCircleInfo
                        avatarPath={avatarPath}
                        level={level}
                        status={status}
                    />
                </div>
                <div className="flex items-center justify-between pt-2 pl-1 ml-24">
                    <h1 className="text-secondary-200 font-mulish font-bold text-xl">
                        {userName}
                    </h1>
                    <img src={league} alt="League" className="ml-2" />
                </div>
            </div>

            <div className="m-4 text-xl flex justify-between">
                <div className="flex gap-1 items-center">
                    <div className="flex items-center text-online">
                        <AiFillTrophy />
                        <span>{wins}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                        <AiOutlineClose />
                        <span>{losses}</span>
                    </div>
                </div>

                <div className="flex gap-4 text-secondary-200 items-center">
                    <TbMessage2 />
                    <TbUserPlus />
                    <TbUserX />
                </div>
            </div>
        </div>
    );
}
