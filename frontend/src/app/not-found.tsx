import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <header className="p-3 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <Link href="/home" className="block w-56">
                        <img
                            src="/images/logo.svg"
                            className="w-56 h-auto md:w-56"
                            alt="logo"
                        />
                    </Link>
                </div>
            </header>
            <div className="flex flex-col items-center gap-8 p-8 lg:mt-52">
                <h2 className="text-4xl font-jost font-bold">Whoops!</h2>
                <p className="text-lg">404 Page Not Found</p>
                <img
                    className="w-[400px] h-auto border-2 border-secondary-500 rounded-lg"
                    src="/gifs/vacation.gif"
                    alt="404"
                />
                <p className="text-lg">
                    Looks like this page went on vacation.
                </p>
                <p className="text-lg font-bold">
                    Try our{' '}
                    <Link
                        className="text-secondary-200 text-xl font-jost"
                        href="/home"
                    >
                        homepage
                    </Link>{' '}
                    instead.
                </p>
            </div>
        </>
    );
}
