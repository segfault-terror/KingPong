import type { Meta, StoryObj } from '@storybook/react';
import StandingGame from '../components/StandingGame';

const meta: Meta<typeof StandingGame> = {
    component: StandingGame,
    title: 'Games/StandingGame',
};
export default meta;

export const Default: StoryObj<typeof StandingGame> = {
    render: (props) => <StandingGame {...props} />,
    args: {
        me: {
			name: 'me',
			image: '',
		},
		opp: {
			name: 'opp',
			image: '',
		},
		youWin: true,
		result: 'YouWin',
    },
};
