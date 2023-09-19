import Link from 'next/link';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
    return (
        <div className="p-5">
            <div
                className="w-full h-20 flex items-center justify-start gap-2
                        font-jost font-bold text-2xl text-white"
            >
                <Link className="text-inactive-200" href="/signin">
                    Sign in
                </Link>
                <span className="text-inactive-500"> / </span>
                <Link className="text-secondary-200" href="/signup">
                    Sign up
                </Link>
            </div>
            <div>
                <SignUpForm />
            </div>
        </div>
    );
}
