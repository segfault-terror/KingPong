import MatchMaking from './MatchMaking';

import TopImg from '../../../../public/images/MatchMacking_t.svg';
import BottomImg from '../../../../public/images/MatchMacking_b.svg';
import LeftImg from '../../../../public/images/MatchMacking_l.svg';
import RightImg from '../../../../public/images/MatchMacking_r.svg';

export default function MatchMakingPage() {
    return <MatchMaking topImg={TopImg.src} bottomImg={BottomImg.src} leftImg={LeftImg.src} rightImg={RightImg.src} />;
}
