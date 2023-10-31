import Link from 'next/link';

type SelectModeProps = {
    mode: string;
    images: string;
    link: string;
    title: string;
};

export default function SelectMode({
    mode,
    images,
    link,
    title,
}: SelectModeProps) {
    return (
        <div className="w-full h-72 md:h-96  flex flex-col justify-center items-center group">
            <Link
                href={link}
                className="w-full rounded-xl flex justify-center items-center opacity-80 group-hover:opacity-100 hover:drop-shadow-neon-white"
            >
                <img
                    src={`/images/${images}.svg`}
                    alt=""
                    className="w-[80%] xl:w-[600px]"
                />
            </Link>
            <Link
                href={link}
                type="Link"
                title={title}
                className="flex items-center justify-center w-32 h-12 lg:w-36 lg:h-14 border-t-4 border-b-4 rounded-3xl border-opponent bg-secondary-500 text-black font-nicomoji group-hover:opacity-100  hover:bg-secondary-200 hover:border-white "
            >
                {mode}
            </Link>
        </div>
    );
}
