/* eslint-disable @next/next/no-img-element */
import PlayerCard from './PlayerCard';
import MatchMakingLeft from '../../public/images/MatchMacking_l.svg';
import MatchMakingRight from '../../public/images/MatchMacking_r.svg';
import MatchMakingTop from '../../public/images/MatchMacking_t.svg';
import MatchMakingBottom from '../../public/images/MatchMacking_b.svg';

export default function MatchMaking() {
    return (
        <div
            className="bg-gradient-to-b from-background via-primary to-background h-screen
			flex flex-col items-center justify-between"
        >
            <div className="w-screen flex flex-col justify-start">
                <img
                    src={MatchMakingTop.src}
                    alt="Left!"
                    className="object-cover object-bottom"
                />
            </div>
            <PlayerCard img="/images/1.jpeg" name="Tommy" />
            <div className="w-screen flex flex-col justify-end">
                <img
                    src={MatchMakingBottom.src}
                    alt="Right!"
                    className="object-cover object-top"
                />
            </div>
        </div>
    );
}
