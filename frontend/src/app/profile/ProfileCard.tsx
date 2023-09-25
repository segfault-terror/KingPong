/* eslint-disable @next/next/no-img-element */

import UserCircleInfo from './UserCircleInfo';

import Archer from '../../../public/images/2.jpeg';
import { UserStatus } from '../../components/DirectMessage';
import { AiFillTrophy, AiOutlineClose } from 'react-icons/ai';
import { TbMessage2, TbUserPlus, TbUserX } from 'react-icons/tb';

import GoldLeague from '../../../public/images/gold-league.svg';

export default function ProfileCard() {
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
                        avatarPath={Archer.src}
                        level={42}
                        status={UserStatus.InGame}
                    />
                </div>
                <div className="flex items-center justify-between pt-2 pl-1 ml-24">
                    <h1 className="text-secondary-200 font-mulish font-bold text-xl">
                        Archer
                    </h1>
                    <img src={GoldLeague.src} alt="League" className="ml-2" />
                </div>
            </div>

            <div className="m-4 text-xl flex justify-between">
                <div className="flex gap-1 items-center">
                    <div className="flex items-center text-online">
                        <AiFillTrophy />
                        <span>2</span>
                    </div>
                    <div className="flex items-center text-red-600">
                        <AiOutlineClose />
                        <span>1</span>
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
