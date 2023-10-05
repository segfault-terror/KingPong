import { Meta, StoryObj } from '@storybook/react';
import ProfileCard from '../app/(dashboard)/profile/ProfileCard';

const meta: Meta<typeof ProfileCard> = {
    title: 'ProfileCard',
    component: ProfileCard,
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Primary: Story = {
    render: () => (
        <div className="mt-40">
            <ProfileCard />
        </div>
    ),
};
