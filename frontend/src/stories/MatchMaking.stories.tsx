import type { Meta } from '@storybook/react';
import MatchMaking from '../components/MatchMaking';

import img from './assets/1.jpeg';

const meta: Meta<typeof MatchMaking> = {
    title: 'MatchMaking',
    component: MatchMaking,
};

export default meta;

export const Default = (): JSX.Element => (
    <>
        <MatchMaking />
    </>
);