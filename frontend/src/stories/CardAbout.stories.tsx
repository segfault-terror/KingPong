import type { Meta } from '@storybook/react';

import CardAbout from '../components/CardAbout';


export default {
    component: CardAbout,
    args: {
        name: 'Ayman',
        links: [''],
        description: 'Hello',
        image: "",
    },
} as Meta;

export const Default = (): JSX.Element => (
    <CardAbout
        firstName="Aymane"
        LastName="Aggoujjil"
        links={['', '', '']}
        description=""
        image=""
    />
);
