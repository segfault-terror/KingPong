import type { Meta } from '@storybook/react';
import SignInForm from '../components/SignInForm';

const meta: Meta<typeof SignInForm> = {
    component: SignInForm,
};

export default meta;

export const SignIn = (): JSX.Element => <SignInForm />;
