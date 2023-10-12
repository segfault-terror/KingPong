import Link from 'next/link';
import { AiFillTrophy, AiOutlineClose } from 'react-icons/ai';
import { TbMessage2, TbUserPlus, TbUserX } from 'react-icons/tb';
import UserCircleInfo from './UserCircleInfo';
import { UsersStats } from './data/ProfileData';

type ProfileCardProps = {
    username: string;
};

export default function ProfileCard({ username }: ProfileCardProps) {
    const stats = UsersStats.find((stats) => stats.username === username);
    const leagueImgPath = `/images/${stats!.league.toLowerCase()}-league.svg`;

    return (
        <div
            className="bg-primary
                        border-2 border-secondary-200 rounded-3xl
                        h-28 md:h-32
                        flex flex-col justify-between"
        >
            <div className="flex items-start relative">
                <div className="absolute bottom-0 md:-bottom-2">
                    <UserCircleInfo username={username} />
                </div>
                <div className="flex items-center justify-between pt-2 pl-1 ml-24 md:ml-32">
                    <h1 className="text-secondary-200 font-mulish font-bold text-xl md:text-2xl">
                        {username}
                    </h1>
                    <img
                        src={leagueImgPath}
                        alt="League"
                        title={`${stats!.league} League`}
                        className="ml-2"
                    />
                </div>
            </div>

            <div className="m-4 text-xl flex justify-between">
                <div className="flex gap-1 items-center md:text-2xl">
                    <div className="flex items-center text-online">
                        <AiFillTrophy />
                        <span>{stats!.wins}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                        <AiOutlineClose />
                        <span>{stats!.losses}</span>
                    </div>
                </div>

                <div className="flex gap-4 text-secondary-200 items-center md:text-2xl">
                    <Link href={`/chat/dm/${username}`}>
                        <TbMessage2 />
                    </Link>
                    <TbUserPlus />
                    <TbUserX />
                </div>
            </div>
        </div>
    );
}
