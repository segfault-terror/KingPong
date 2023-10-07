import { redirect } from 'next/navigation';
import Link from 'next/link';

function checkUser() {
    return true;
}

export default function page() {
    if (!checkUser()) {
        redirect('/signin');
    }
    return (
        <main className="font-nicomoji text-5xl text-center py-10 text-secondary-200">
            <h3>Welcome Back</h3>
            <h2 className="font-jost text-opponent font-bold text-8xl my-6">
                omarox
            </h2>
            <h3>Select mode to start playing</h3>
            <div className="my-8 lg:my-12 text-2xl flex justify-center gap-6 lg:gap-32">
                <Link
                    className="flex items-center justify-center w-44 h-12 border-[5px] rounded-3xl border-opponent bg-secondary-200 text-background"
                    href="/game/normal"
                >
                    Normal
                </Link>
                <Link
                    className="flex items-center justify-center w-44 h-12 border-[5px] rounded-3xl border-secondary-200 bg-opponent text-white"
                    href="/game/ranked"
                >
                    Ranked
                </Link>
            </div>
        </main>
    );
}