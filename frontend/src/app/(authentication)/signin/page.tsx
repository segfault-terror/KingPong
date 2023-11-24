import Link from 'next/link';
import SignInForm from './SignInForm';

export default function SignInPage(): JSX.Element {
    return (
        <div className="p-5">
            <div
                className="w-full h-20 flex items-center justify-start gap-2
                        font-jost font-bold text-2xl text-white"
            >
                <Link className="text-secondary-200" href="/signin">
                    Sign in
                </Link>
                <span className="text-inactive-500"> / </span>
                <Link className="text-inactive-200 hover:scale-105 hover:text-gray-400 transition-all duration-100 ease-in-out delay-75" href="/signup">
                    Sign up
                </Link>
            </div>
            <div>
                <SignInForm />
            </div>
        </div>
    );
}
