import PlayerCard from "./PlayerCard";
import Image from "next/image";

export default function MatchMaking() {
	return (
		<div className="w-screen h-screen flex items-center justify-center
					bg-gradient-to-b from-background via-primary to-background relative">
			<Image
				src="/images/MatchMacking_back_r.svg"
				alt="MatchMaking_back_r"
				fill={true}
				className="object-cover absolute z-0"
			/>
			<Image
				src="/images/MatchMacking_back_l.svg"
				alt="MatchMaking_back_l"
				fill={true}
				className="object-cover absolute z-0"
			/>
			<div className="absolute z-10">
				<PlayerCard img="/images/1.jpeg" name="Tommy" />
			</div>
			{/* <PlayerCard img="/images/1.jpeg" name="Tommy" /> */}
		</div>
	);
}