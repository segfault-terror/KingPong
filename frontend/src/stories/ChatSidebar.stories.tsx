import { Meta, StoryObj } from '@storybook/react';
import ChatSidebar from '../components/ChatSideBar';

const meta: Meta<typeof ChatSidebar> = {
    title: 'ChatSidebar',
    component: ChatSidebar,
};

export default meta;
type Story = StoryObj<typeof ChatSidebar>;

export const Primary: Story = {};
