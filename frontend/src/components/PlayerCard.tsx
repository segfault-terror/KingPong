import Image from 'next/image';

export default function PlayerCard({
    img,
    name,
}: {
    img: string;
    name: string;
}) {
    return (
        <div className="min-w-screen flex min-h-screen items-center justify-center">
            <div
                className="h-96 w-72 rounded-2xl
				bg-white bg-gradient-to-t from-gray-500 via-gray-300 to-white p-1"
            >
                <div
                    className="flex h-full w-full flex-col
						items-center justify-center gap-12 rounded-2xl bg-white"
                >
                    <div
                        className="relative h-52 w-60 rounded-2xl bg-white
					bg-gradient-to-t from-gray-400 via-gray-200 to-white
					shadow-[0.0px_10.0px_12.0px_rgba(37,10,59,0.85)]"
                    >
                        <Image
                            src={img}
                            alt="player"
                            fill={true}
                            className="rounded-2xl
						object-cover"
                        />
                    </div>
                    <div
                        className="bg-secondary-200 font-nicomoji grid h-12 w-60 items-center
						justify-center rounded-2xl text-2xl
						shadow-[0.0px_10.0px_12.0px_rgba(37,10,59,0.80)]"
                    >
                        {name}
                    </div>
                </div>
            </div>
        </div>
    );
}
