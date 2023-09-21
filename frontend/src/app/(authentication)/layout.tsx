import React from 'react';
import Logo from '@/components/Logo';
import Board from './Board';
import Image from 'next/image';
import dots from './dots.svg';
import side from './sideHexagone.svg';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="h-screen relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div>
                    <Logo
                        className="w-[50%] bg-background"
                        mylogo="/images/logo.svg"
                    />
                    <div className="col-span-1 lg:w-1/2 lg:m-auto bg-background">
                        {children}
                    </div>
                </div>
                <div className="hidden lg:block overflow-hidden py-20 w-full h-full">
                    <Board className="rotate-[30deg] left-[25%]" />
                </div>
            </div>
            <div
                className="absolute top-[50%] translate-x-[-51%] rotate-[93deg]
                         h-[27px] w-[417px] rounded-3xl bg-[#A88733]"
            ></div>
            <div
                className="absolute top-[18%] left-0 translate-x-[-50%]
                        w-36 h-36"
            >
                <Image
                    src={side.src}
                    alt="side Hexagone"
                    width={144}
                    height={144}
                />
            </div>
            <div className="absolute overflow-hidden bottom-0 w-full h-full -z-10">
                <Image
                    className="absolute bottom-0 left-0 w-96 h-auto
                        rotate-45"
                    src={dots.src}
                    alt="dots"
                    width={105}
                    height={130}
                />
            </div>
        </div>
    );
}
