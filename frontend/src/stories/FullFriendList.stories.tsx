import { Meta, StoryObj } from '@storybook/react';
import FullFriendList from '../app/(dashboard)/profile/FullFriendList';
import { UserStatus } from '../app/chat/DirectMessage';

import Tommy from './assets/1.jpeg';
import Archer from './assets/2.jpeg';
import Moussa from './assets/3.jpeg';

const meta: Meta<typeof FullFriendList> = {
    title: 'FullFriendList',
    component: FullFriendList,
};

export default meta;
type Story = StoryObj<typeof FullFriendList>;

export const Primary: Story = {
    render: (args) => (
        <div className="mt-40 mx-60">
            <FullFriendList {...args} />
        </div>
    ),
    args: {
        lastFriends: [
            {
                avatarPath: Tommy.src,
                level: 1,
                status: UserStatus.Online,
            },
            {
                avatarPath: Tommy.src,
                level: 1,
                status: UserStatus.Online,
            },
            {
                avatarPath: Tommy.src,
                level: 1,
                status: UserStatus.Online,
            },
        ],
    },
};
