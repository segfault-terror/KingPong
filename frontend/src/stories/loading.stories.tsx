import type { Meta } from '@storybook/react';

import Loading from '../components/Loading';

export default {
    component: Loading,
} as Meta;

export const Default = (): JSX.Element => <Loading />;
