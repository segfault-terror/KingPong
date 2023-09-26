import { Meta, StoryObj } from '@storybook/react';
import FullFriendList from '../app/profile/FullFriendList';
import { UserStatus } from '../components/DirectMessage';

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
        <div className="mt-40">
            <FullFriendList {...args} />
        </div>
    ),
	args: {
		lastFriends: [
		],
	},
};