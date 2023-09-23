import type { Meta } from '@storybook/react';
import MatchMaking from '../app/(game)/matchmaking/MatchMaking';

import TopImage from '../../public/images/MatchMacking_t.svg';
import BottomImage from '../../public/images/MatchMacking_b.svg';
import LeftImage from '../../public/images/MatchMacking_l.svg';
import RightImage from '../../public/images/MatchMacking_r.svg';

const meta: Meta<typeof MatchMaking> = {
    title: 'MatchMaking',
    component: MatchMaking,
};

export default meta;

export const Default = (): JSX.Element => (
    <>
        <MatchMaking topImg={TopImage.src} bottomImg={BottomImage.src} leftImg={LeftImage.src} rightImg={RightImage.src} />
    </>
);
