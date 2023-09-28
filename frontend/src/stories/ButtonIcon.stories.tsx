import type { Meta } from '@storybook/react';
import ButtonIcon from '../components/ButtonIcon';
import { MdOutlineNotifications, MdChatBubbleOutline } from 'react-icons/md';

export default {
    component: ButtonIcon,
} as Meta;

export const Default = () => (
    <>
        <ButtonIcon>
            <MdOutlineNotifications />
        </ButtonIcon>
        <ButtonIcon>
            <MdChatBubbleOutline />
        </ButtonIcon>
    </>
);
