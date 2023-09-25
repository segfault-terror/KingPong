import { Meta, StoryObj } from '@storybook/react';
import Achievement from '../app/profile/Achievement';

import imgAchievement from '../../public/images/gold-achievement.svg'

const meta: Meta<typeof Achievement> = {
    title: 'Achievement',
    component: Achievement,
};

export default meta;
type Story = StoryObj<typeof Achievement>;

export const Primary: Story = {
    args: {
        title: 'Paddle Master',
        description: 'Score 10 points in a row without letting the ball pass your paddle.',
        image: imgAchievement.src,
    },
    render: (args) => (
        <div className="mt-40">
            <Achievement {...args} />
        </div>
    ),
};
