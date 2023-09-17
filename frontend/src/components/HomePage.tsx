'use client';

import Logo from '@/components/Logo';
import ButtonPlay from './ButtonPlay';
import BordGame from './BordGame';
import Link from 'next/link';

export default function HomePage() {
    const welcomeMessage: string = `KingPong, a royal blend of classic nostalgia and modern excitement! Revive the hype of the original Pong game as you go on a thrilling journey. Will you claim the crown and become the ultimate Pong King? It's time to find out!`;

    return (
        <main className="bg-points relative flex min-h-screen items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat">
            <div className="absolute z-20 min-h-screen items-center">
                <Logo className="w-[50%]" mylogo="/images/logo.svg" />
                <div
                    className="mt-12 text-center
                text-white sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 "
                >
                    <h1
                        className="font-nicomoji drop-shadow-neon-white
                    z-30 mb-10 text-5xl sm:text-6xl md:text-7xl
                    lg:text-8xl xl:text-9xl"
                    >
                        Welcome
                    </h1>
                    <p
                        className="font-jost
                     z-30 mx-10 text-lg font-light leading-7
                    sm:mx-24 sm:text-xl md:mx-40 md:text-2xl lg:mx-64
                    lg:text-3xl xl:mx-80 xl:text-4xl"
                    >
                        {welcomeMessage}
                    </p>
                    <div className="mt-[5%] flex justify-center align-middle">
                        <ButtonPlay
                            root="/dashboard"
                            className=" font-nicomoji bg-secondary-200 hover:border-secondary-500 border-background text-primary z-10  items-center rounded-full border-b-4 border-t-4 px-5 py-2 text-center transition-all sm:px-16 sm:py-3"
                        />
                    </div>
                </div>
                <Logo
                    className=" fixed left-0 top-[70%] -z-10"
                    mylogo="/images/dotted-circle.svg"
                />
                <Logo
                    className="fixed bottom-0 left-[80%] z-0 w-[30%]"
                    mylogo="/images/tree-circles.svg"
                />
            </div>
            <div className="animate-bordshadow absolute top-[12%] shadow-inner blur-[3px]">
                <BordGame />
            </div>
            <Link className='flex items-center absolute bottom-0' href={'#'}>
                <Logo className="animate-bounce drop-shadow-neon-white" mylogo="/images/arrow-about.svg" />
            </Link>
        </main>
    );
}
