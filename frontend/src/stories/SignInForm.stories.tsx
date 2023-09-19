import type { Meta } from '@storybook/react';
import SignInForm from '../app/(authentication)/signin/SignInForm';

const meta: Meta<typeof SignInForm> = {
    component: SignInForm,
};

export default meta;

export const SignIn = (): JSX.Element => <SignInForm />;
