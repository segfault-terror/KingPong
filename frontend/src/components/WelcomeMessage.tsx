'use client'

import ButtonPlay from "./ButtonPlay"
import { useEffect, useState } from "react"
import React from "react"

function Welcome(){

	const welcomeMessage: string = `KingPong, a royal blend of classic nostalgia and modern excitement! Revive the hype of the original Pong game as you go on a thrilling journey. Will you claim the crown and become the ultimate Pong King? It's time to find out!`;

	const [isLoaded, setIsLoaded] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false);
        }, 500);
    }, []);

	return(
	<div className={`${isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 delay-100'}
	`}>
		<h1
			className={`font-nicomoji drop-shadow-neon-white items-center
		z-30 mb-10 text-5xl sm:text-6xl md:text-7xl
		lg:text-8xl xl:text-9xl`}
		>
			{`Welcome`}
		</h1>
		<p
			className="font-jost
		z-30 mx-10 text-lg font-light leading-7
		sm:mx-[20%] sm:text-lg md:mx-40 md:text-2xl lg:mx-64
		lg:text-3xl xl:mx-[30%] xl:text-4xl"
		>
			{welcomeMessage}
		</p>
		<div className="mt-[5%] sm:mt-[5%] md:mt-[5.5%] lg:mt-[6%] xl:mt-[7%] flex justify-center align-middle">
			<ButtonPlay
				root="/dashboard"
				className=" font-nicomoji bg-secondary-200 hover:border-secondary-500 border-background text-primary z-10  items-center rounded-full border-b-4 border-t-4 px-1 py-1 text-center text-sm transition-all sm:text-xl sm:px-4 sm:py-2 md:text-2xl md:px-6 md:py-2.5 lg:text-3xl lg:px-7 lg:py-3 xl:text-4xl xl:px-7 xl:py-3.5"
				str="Play Now !"
				/>
		</div>
	</div>
	)
}

export default React.memo(Welcome);