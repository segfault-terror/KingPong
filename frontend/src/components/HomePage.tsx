import Logo from '@/components/Logo';
import ButtonPlay from './ButtonPlay';

export default function HomePage() {
    const welcomeMessage: string = `KingPong, a royal blend of classic nostalgia and modern excitement! Revive the hype of the original Pong game as you go on a thrilling journey. Will you claim the crown and become the ultimate Pong King? It's time to find out!`;

    return (
        <main className="bg-points min-h-screen bg-cover bg-fixed bg-center bg-no-repeat ">
            <Logo className="w-[100%] sm:w-[50%]" mylogo="/images/logo.svg" />
            <div
                className="mt-12 text-center
                text-white sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32"
            >
                <h1
                    className="font-nicomoji
                    mb-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                    xl:text-9xl"
                >
                    Welcome
                </h1>
                <p
                    className="font-jost
                    text-md mx-10 text-lg leading-10 sm:mx-16 sm:text-xl
                    md:mx-32 md:text-2xl lg:mx-64 lg:text-3xl xl:mx-80
                    xl:text-4xl"
                >
                    {welcomeMessage}
                </p>
            </div>
            <div className="mt-[5%] flex justify-center align-middle">
                <ButtonPlay
                    root="/dashboard"
                    className="font-nicomoji bg-secondary-200 hover:border-secondary-500 border-background text-primary items-center  rounded-full border-b-4 border-t-4 px-5 py-2 text-center sm:px-16 sm:py-3"
                />
            </div>
            <div className="flex justify-between">
                <Logo
                    className=" sm-[50%] fixed left-0 top-[60%] w-[20%]"
                    mylogo="/images/dotted-circle.svg"
                />
                <Logo
                    className="fixed bottom-0 right-0 h-[20%] sm:h-[40%]"
                    mylogo="/images/shadow-circle.svg"
                />
            </div>
        </main>
    );
}
