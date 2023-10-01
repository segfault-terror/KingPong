import { Meta, StoryObj } from '@storybook/react';
import UserCircleInfo from '../../src/app/profile/UserCircleInfo';

import Avatar from './assets/2.jpeg';
import { UserStatus } from '../app/chat/DirectMessage';

const meta: Meta<typeof UserCircleInfo> = {
    title: 'UserCircleInfo',
    component: UserCircleInfo,
};

export default meta;
type Story = StoryObj<typeof UserCircleInfo>;

export const Primary: Story = {
    args: {
        avatarPath: Avatar.src,
        level: 100,
        status: UserStatus.Online,
    },
};
