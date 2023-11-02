export default function LoadingEmpty() {
    return (
        <div
            className={`flex justify-between items-center h-24 w-full my-1 rounded-2xl relative bg-background`}
        >
            <div className="flex justify-stretch items-center w-full h-full cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-[#503A62] opacity-90 m-2 object-cover self-start"></div>
                <div className="font-jost w-3/4 h-1/3 rounded-full text-md sm:text-lg md:text-xl m-auto bg-[#503A62] opacity-70"></div>
            </div>
        </div>
    );
}
