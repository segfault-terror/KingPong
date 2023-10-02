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
		myimage: 'https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg',
		oppimage: 'https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg',
		youWin: true,
    },
};
