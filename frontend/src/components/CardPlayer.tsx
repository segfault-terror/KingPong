export function CardPlayerTop({
    isMobile,
    username,
    avatar,
}: {
    isMobile: string;
    username: string;
    avatar: string;
}) {
    return (
        <div
            className={` ${isMobile} self-start rounded-full h-12 w-32 md:h-16 md:w-40 lg:h-24 lg:w-52 xl:h-32 xl:w-72  bg-primary border-2 border-secondary-500 flex
			justify-between items-center p-1 drop-shadow-[0px_0px_10px_#D91F40]`}
        >
            <img
                src={avatar}
                alt=""
                className="h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20 xl:h-28 xl:w-28 rounded-full place-items-start border-r border-l border-red-500"
            />
            <h1 className="text-md md:text-xl lg:text-2xl xl:text-4xl text-white font-jockey font-bold text-center  self-center bg-background/20 rounded-full p-2">
                {username}
            </h1>
        </div>
    );
}

export function CardPlayerBottom({
    isMobile,
    username,
    avatar,
}: {
    isMobile: string;
    username: string;
    avatar: string;
}) {
    return (
        <div
            className={` ${isMobile} self-end rounded-full h-12 w-32 md:h-16 md:w-40 lg:h-24 lg:w-52 xl:h-32 xl:w-72 bg-primary border-2 border-secondary-500 flex
                    justify-between items-center p-1 drop-shadow-[0px_0px_10px_#03CE18]`}
        >
            <h1 className="text-md md:text-xl lg:text-2xl xl:text-4xl text-white font-jockey font-bold text-center self-center bg-background/20 rounded-full p-2 ">
                {username}
            </h1>
            <img
                src={avatar}
                alt=""
                className="h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20 xl:h-28 xl:w-28 rounded-full place-items-start border-r border-l border-green-500"
            />
        </div>
    );
}
