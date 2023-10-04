import type { Meta } from '@storybook/react';

import Loading from '../app/loading';

export default {
    component: Loading,
} as Meta;

export const Default = (): JSX.Element => <Loading />;
