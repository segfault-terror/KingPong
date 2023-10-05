import { Meta, StoryObj } from '@storybook/react';
import AchievementList from '../app/(dashboard)/profile/AchievementList';
import AchievementImg from '../../public/images/gold-achievement.svg';

const meta: Meta<typeof AchievementList> = {
    title: 'AchievementList',
    component: AchievementList,
};

export default meta;
type Story = StoryObj<typeof AchievementList>;

export const Primary: Story = {
    render: (args) => (
        <div className="mt-40">
            <AchievementList {...args} />
        </div>
    ),
    args: {
        achievements: [
            {
                title: 'Paddle Master',
                description:
                    'Score 10 points in a row without letting the ball pass your paddle.',
                image: AchievementImg.src,
            },
            {
                title: 'Paddle Master',
                description:
                    'Score 10 points in a row without letting the ball pass your paddle.',
                image: AchievementImg.src,
            },
            {
                title: 'Paddle Master',
                description:
                    'Score 10 points in a row without letting the ball pass your paddle.',
                image: AchievementImg.src,
            },
        ],
    },
};
