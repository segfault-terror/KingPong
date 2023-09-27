'use client'
import React from 'react';
import Logo from '@/components/Logo';
import BordGame from './BordGame';
import WelcomeMessage from './WelcomeMessage';
import Link from 'next/link';
import Lottie from 'lottie-react';
import LightAbout from "../../public/LightAbout.json";

function HomePage() {
    return (
        <main className="bg-points min-h-screen bg-center bg-cover flex items-center justify-center relative overflow-y-auto overflow-x-hidden">
            <Logo
                className="absolute top-0 left-0 w-[75%] md:w-[50%] sm:w-[40%] z-20"
                mylogo="/images/logo.svg"
            />
            <div className="z-20 absolute justify-center-center sm:top-[10%] md:top-[12%] lg:top-[17%] ">
                <div className="text-center mt-5">
                    <WelcomeMessage />
                </div>
            </div>
            <Logo
                className="fixed left-0 top-[70%] z-0 max-h-[30%]"
                mylogo="/images/dotted-circle.svg"
            />
            <Logo
                className="fixed bottom-0 right-0 z-0 max-w-[30%]"
                mylogo="/images/tree-circles.svg"
            />
            <div className="z-10 absolute top-[12%] blur-[1.5px]">
                <BordGame />
            </div>
            <div className="absolute z-0 top-[12%] after:blur-[3.5rem] flex h-[100px] w-[200px] items-center justify-between rounded-3xl sm:h-[250px] sm:w-[350px] md:h-[380px] md:w-[620px] lg:h-[500px] lg:w-[1000px] xl:h-[600px] xl:w-[1200px] aspect-[1/1.5] animate-bordshadow"></div>
            <Link
                href="/about"
                placeholder="about"
                className="flex items-center absolute bottom-0 z-0 sm:w-[80px] md:w-[200px] hover:drop-shadow-[-5px_0px_10px_#467483]"
                type="button"
            >
                <Lottie animationData={LightAbout} loop={true} />
            </Link>
        </main>
    );
}

export default React.memo(HomePage);
