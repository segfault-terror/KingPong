import MatchMaking from './MatchMaking';

import TopImg from '../../../../public/images/MatchMacking_t.svg';
import BottomImg from '../../../../public/images/MatchMacking_b.svg';

export default function MatchMakingPage() {
    return <MatchMaking topImg={TopImg.src} bottomImg={BottomImg.src} />;
}
