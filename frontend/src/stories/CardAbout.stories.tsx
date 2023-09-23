import type { Meta } from '@storybook/react';

import CardAbout from '../components/CardAbout';

import Ayman from './assets/ayman-card.svg';
import {AiFillGithub} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';
import {TbWorld} from 'react-icons/tb';

export default {
    component: CardAbout,
    args: {
        name: 'Ayman',
        links: [''],
        description: 'Hello',
        image: Ayman.src,
    },
} as Meta;

export const Default = (): JSX.Element => (
    <CardAbout
        firstName="Aymane"
        LastName="Aggoujjil"
        links={[AiFillGithub, AiFillLinkedin, TbWorld]}
        description=""
        image={Ayman.src}
    />
);
