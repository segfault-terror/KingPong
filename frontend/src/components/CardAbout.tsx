interface CardAboutProps {
    firstName: string;
    LastName: string;
    links: string[];
    description: string;
    image: string;
}

import line from '/public/images/line-about.svg';
import Image from 'next/image';
import Intersect from '/public/images/Intersect.svg';
import recAbout from '/public/images/rec-about.svg';
import Link from 'next/link';
import github from '/public/images/github.svg';
import linkedin from '/public/images/linkedin.svg';
import portfolio from '/public/images/portfolio.svg';

export default function CardAbout(props: CardAboutProps) {
    return (
        <div className="w-48 h-24 sm:w-48 sm:h-24 md:w-64 md:h-32 lg:w-80 lg:h-40 xl:w-96 xl:h-48 bg-[#041111]  grid grid-cols-2 relative rounded-r-xl ">
            <img
                src={props.image}
                alt="image"
                className="object-cover rounded-r-xl]"
            />
            <Image
                src={line}
                alt="line"
                className="items-center justify-items-center w-full h-full absolute z-10"
            />
            <div className="bg-[#041111] rounded-r-xl grid grid-rows-2 grid-flow-row-dense">
                <div className=" rounded-b-lg text-[#E6E6E6] text-center font-jost bg-gradient-to-r from-[#041111] from-[40%] to-[#0F5262] border-r-2 border-[#083341]  rounded-r-xl">
                    <p>{props.firstName}</p>
                    <p>{props.LastName}</p>
                </div>
                <div className="flex justify-around items-center mx-2 z-10">
                    <Link href={props.links[0]} className="w-[25%]">
                        <img src={github.src} alt="" />
                    </Link>
                    <Link href={props.links[1]} className="w-[25%]">
                        <img src={linkedin.src} alt="" />
                    </Link>
                    <Link href={props.links[2]} className="w-[25%]">
                        <img src={portfolio.src} alt="" />
                    </Link>
                </div>
            </div>
            <Image
                src={Intersect}
                alt="intersect"
                className="items-end justify-end absolute bottom-0"
            />
            <span className="w-8 h-3 md:w-9 md:h-4 lg:w-12 lg:h-5 xl:w-14 xl:h-6 rounded-r-xl bg-[#467483] absolute"></span>
            <span className="w-7 h-3 md:w-8 md:h-4 lg:w-11 lg:h-5 xl:w-13 xl:h-6 rounded-r-xl bg-[#0F5262] absolute"></span>
            <span className="w-6 h-3 md:w-7 md:h-4 lg:w-10 lg:h-5 xl:w-12 xl:h-6   rounded-r-xl bg-[#083341] absolute"></span>
        </div>
    );
}

