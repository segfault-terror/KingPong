import type { Meta } from '@storybook/react';
import Input from '../app/(authentication)/Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;

export const Default = (): JSX.Element => (
    <>
        <Input>Username</Input>
        <br />
        <Input type="password" placeholder="Password" />
    </>
);
