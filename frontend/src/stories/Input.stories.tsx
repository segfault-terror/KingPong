import type { Meta } from '@storybook/react';
import Input from '../components/Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;

export const Default = (): JSX.Element => (
    <>
        <Input id="uname" type="text">
            Username
        </Input>
        <br />
        <Input id="pass" type="password" placeholder="Password" />
    </>
);
