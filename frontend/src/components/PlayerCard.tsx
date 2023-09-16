import Image from 'next/image';

export default function PlayerCard({img, name}: {img: string, name: string}) {
    return (
		<div className="min-w-screen min-h-screen flex justify-center items-center">

			<div className="bg-white w-72 h-96 rounded-2xl
				bg-gradient-to-t from-gray-500 via-gray-300 to-white p-1">
				<div className="h-full w-full bg-white rounded-2xl
						flex flex-col justify-center items-center gap-12
						">
					<div className="relative bg-white w-60 h-52 rounded-2xl
					bg-gradient-to-t from-gray-400 via-gray-200 to-white
					shadow-[0.0px_10.0px_12.0px_rgba(37,10,59,0.85)]">
						<Image src={img} alt="player" fill={true} className='rounded-2xl
						object-cover' />
					</div>
					<div className="grid items-center justify-center bg-secondary-200 w-60 h-12
						text-2xl rounded-2xl shadow-[0.0px_10.0px_12.0px_rgba(37,10,59,0.80)]
						font-nicomoji">
						{name}
					</div>
				</div>
			</div>

		</div>
    );
}