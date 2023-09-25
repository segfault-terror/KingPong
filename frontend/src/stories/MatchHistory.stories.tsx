import { Meta, StoryObj } from '@storybook/react';
import MatchHistory from '../app/profile/MatchHistory';
import Tommy from './assets/1.jpeg';
import Archer from './assets/2.jpeg';

const meta: Meta<typeof MatchHistory> = {
    title: 'MatchHistory',
    component: MatchHistory,
};

export default meta;
type Story = StoryObj<typeof MatchHistory>;

export const Primary: Story = {
    args: {
        gameResults: [
            {
                playerAvatar: Tommy.src,
                opponentAvatar: Archer.src,
                playerLevel: 72,
                opponentLevel: 84,
                playerScore: 3,
                opponentScore: 11,
            },
            {
                playerAvatar: Tommy.src,
                opponentAvatar: Archer.src,
                playerLevel: 72,
                opponentLevel: 84,
                playerScore: 3,
                opponentScore: 11,
            },
            {
                playerAvatar: Tommy.src,
                opponentAvatar: Archer.src,
                playerLevel: 72,
                opponentLevel: 84,
                playerScore: 3,
                opponentScore: 11,
            },
        ],
    },
};
