import type { Meta } from '@storybook/react';
import PlayerCard from '../components/PlayerCard';

import img from './assets/1.jpeg';

const meta: Meta<typeof PlayerCard> = {
    title: 'PlayerCard',
    component: PlayerCard,
};

export default meta;

export const Default = (): JSX.Element => (
    <>
        <PlayerCard img={img.src} name="Tommy" />
    </>
);
