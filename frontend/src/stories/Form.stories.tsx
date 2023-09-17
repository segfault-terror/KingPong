import type { Meta } from '@storybook/react';
import Form, { SignUpForm } from '../components/Form';

const meta: Meta<typeof Form | typeof SignUpForm> = {
    title: 'Form',
    component: SignUpForm,
};

export default meta;

export const SignUp = (): JSX.Element => <SignUpForm />;
