import HomePage from '@/components/HomePage';
import MatchMaking from '../components/MatchMaking';

import Top from '../../public/images/MatchMacking_t.svg';
import Bottom from '../../public/images/MatchMacking_b.svg';

export default function Home() {
    return <MatchMaking topImg={Top.src} bottomImg={Bottom.src} />;
}
