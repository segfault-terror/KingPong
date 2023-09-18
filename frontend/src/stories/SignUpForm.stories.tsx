import type { Meta } from '@storybook/react';
import SignUpForm from '../components/SignUpForm';

const meta: Meta<typeof SignUpForm> = {
    component: SignUpForm,
};

export default meta;

export const SignUp = (): JSX.Element => <SignUpForm />;
