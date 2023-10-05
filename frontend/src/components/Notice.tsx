'use client'

import Link from 'next/link';
import Image from 'next/image';
import Accept from '@/../public/images/accept.svg';
import Decline from '@/../public/images/decline.svg';
import { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    sender: string;
}

const Crown = () => {
    return (
        <Image src={Accept} alt="Accept">
        </Image>
    )
}

const Cross = () => {
    return (
        <Image src={Decline} alt="Decline">
        </Image>
    )
}

export default function Notification(props: NotificationProps) {

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 1000);
    }, []);

    const handleClick = () => {
        setAnimate(false);
        console.log("clicked");
    }
    return (
        <div className={animate == true ? `min-h-screen w-screen flex justify-end opacity-0` : `flex justify-end animate-[TranslateLeft_1.5s_linear] overflow-hidden `}>
            <div className="w-screen md:w-2/5 h-24 md:h-36 xl:w-4/12 xxl:w-[20%] bg-white  rounded-es-xl grid grid-cols-4 grid-rows-2 shadow-inner drop-shadow-[0px_2px_5px_#ffffffAA]">
                <div className="mx-1 col-span-1 row-span-2 flex flex-col justify-center items-center w-full ">
                    <img
                        src="https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg"
                        alt="sender"
                        className="w-20   md:w-full rounded-full border-2 border-gray-300 drop-shadow-[0px_0px_5px_#606060]"
                    />
                    <p className="text-sm text-center text-black">{props.sender}</p>
                </div>
                <div className="col-span-3 row-span-1 md:col-span-2 md:row-span-2 flex justify-center items-center text-sm md:text-lg text-center align-middle text-black m-1">
                    {props.message}
                </div>
                <div className="col-span-3 row-span-1 md:col-span-1 md:row-span-2 md:flex-col md:justify-around flex justify-around items-center text-center align-middle text-black font-jost ">
                    <Link
                        href={'#'}
                        className="w-2/5 h-2/4 md:w-2/4 md:h-2/6 bg-green-600 rounded-lg drop-shadow-[0px_0px_5px_#A0A0A0] flex flex-col justify-center items-center"
                    >
                        {Crown() }
                    </Link>
                    <Link
                        href={'#'}
                        className="w-2/5 h-2/4 md:w-2/4 md:h-2/6 bg-red-600 rounded-lg drop-shadow-[0px_0px_5px_#A0A0A0] flex flex-col justify-center items-center"
                        onClick={handleClick}
                    >
                        {Cross() }
                    </Link>
                </div>
            </div>
        </div>
    );
}
