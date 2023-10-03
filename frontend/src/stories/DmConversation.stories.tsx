import { Meta, StoryObj } from '@storybook/react';
import DmConversation from '../app/chat/DmConversation';
import Archer from './assets/2.jpeg';
import { UserStatus } from '../app/chat/DirectMessage';

const meta: Meta<typeof DmConversation> = {
    title: 'Chat/DmConversation',
    component: DmConversation,
};

export default meta;
type Story = StoryObj<typeof DmConversation>;

export const Primary: Story = {
    args: {
        userImg: Archer.src,
        userName: 'Archer',
        userStatus: UserStatus.Online,
        messages: [
            {
                isMe: false,
                text: 'Wa fin hadchi',
            },
            {
                isMe: true,
                text: 'fin',
            },
            {
                isMe: false,
                text: 'Wach bant lik?',
            },
        ],
    },
};
