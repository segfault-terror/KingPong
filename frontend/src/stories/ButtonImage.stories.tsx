import type { Meta } from '@storybook/react';
import ButtonImage from '../components/ButtonImage';
import avatar from './assets/4.jpeg';

export default {
    component: ButtonImage,
} as Meta;

export const Default = () => (
    <>
        <ButtonImage>
            <img src={avatar.src} alt="avatar" />
        </ButtonImage>
    </>
);
