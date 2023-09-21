/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

export default function PlayerCard({
    img,
    name,
}: {
    img: string;
    name: string;
}) {
    return (
        <div
            className="h-48 w-36 rounded-2xl
				bg-gradient-to-t from-gray-500 via-gray-300 to-white p-[2px]"
        >
            <div
                className="h-full w-full
                        flex flex-col items-center justify-around
                        rounded-2xl bg-white"
            >
                <img
                    src={img}
                    alt="player"
                    className="rounded-xl h-[65%] w-[90%] object-cover
                        shadow-[0_2.8px_2.2px_rgba(37,10,59,_0.034),_0_6.7px_5.3px_rgba(37,10,59,_0.048),_0_12.5px_10px_rgba(37,10,59,_0.06),_0_22.3px_17.9px_rgba(37,10,59,_0.072),_0_41.8px_33.4px_rgba(37,10,59,_0.086),_0_100px_80px_rgba(37,10,59,_0.12)]"
                />
                <div
                    className="w-[90%] bg-secondary-200 font-nicomoji grid items-center
						justify-center rounded-2xl text-sm text-primary
                        shadow-[0_2.8px_2.2px_rgba(37,10,59,_0.034),_0_6.7px_5.3px_rgba(37,10,59,_0.048),_0_12.5px_10px_rgba(37,10,59,_0.06),_0_22.3px_17.9px_rgba(37,10,59,_0.072),_0_41.8px_33.4px_rgba(37,10,59,_0.086),_0_100px_80px_rgba(37,10,59,_0.12)]"
                >
                    {name}
                </div>
            </div>
        </div>
    );
}
