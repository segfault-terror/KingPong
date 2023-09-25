import { Meta, StoryObj } from '@storybook/react';
import GameResult from '../app/profile/GameResult';
import Tommy from './assets/1.jpeg';
import Archer from './assets/2.jpeg';

const meta: Meta<typeof GameResult> = {
    title: 'GameResult',
    component: GameResult,
};

export default meta;
type Story = StoryObj<typeof GameResult>;

export const Primary: Story = {
    render: (args) => {
        return (
            <div className="w-[90%] mx-auto">
                <GameResult {...args} />
            </div>
        );
    },
    args: {
        playerAvatar: Tommy.src,
        opponentAvatar: Archer.src,
        playerLevel: 42,
        opponentLevel: 69,
        playerScore: 3,
        opponentScore: 11,
    },
};
