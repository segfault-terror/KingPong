import { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '../app/chat/ToggleButton';

import ball from '../../public/images/togglebuttonball.svg';

const meta: Meta<typeof ToggleButton> = {
    title: 'ToggleButton',
    component: ToggleButton,
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Primary: Story = {
    render: (args) => (
            <ToggleButton img={ball.src} />
    ),
};
