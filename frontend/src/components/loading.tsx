import { HiOutlineRefresh } from "react-icons/hi";

export default function Loading() {
    return (
        <div className="min-h-screen bg-center bg-cover flex items-center justify-center relative overflow-y-hidden">
            <div className="border-2 w-40 h-24 sm:w-40 sm:h-24 md:w-48 md:h-32 lg:w-60 lg:h-40 xl:w-80 xl:h-52 rounded-2xl flex items-center justify-between bg-gradient-radial from-[#4A4A4A] to-[#010101] drop-shadow-neon-white">
                <div className="h-4 w-[4px] lg:h-5 lg:w-[5px]  xl:h-7 xl:w-[6px] border-[1px] rounded-l-xl bg-neutral-200 mx-2 animate-loading-ping absolute left-[1%] "></div>
                <div className="w-[4px] h-[4px] lg:w-2 lg:h-2 xl:w-2 xl:h-2 rounded-full absolute animate-loading-ball bg-slate-300">
				</div>
                <div className="h-4 w-[4px] lg:h-5 lg:w-[5px] xl:h-7 xl:w-[6px] border-[1px] rounded-r-xl bg-neutral-200 mx-2 animate-loading-pong absolute right-[1%]"></div>
            </div>
		</div>
    );
}
