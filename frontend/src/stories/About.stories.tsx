import type { Meta } from '@storybook/react';

import About from '../components/About';


export default {
    component: About,
} as Meta;

export const Default = (): JSX.Element => (
    <About
    />
);
