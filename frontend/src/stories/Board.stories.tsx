import type { Meta } from '@storybook/react';

import Board from '../app/(authentication)/Board';

export default {
    component: Board,
} as Meta;

export const Default = (): JSX.Element => <Board />;
