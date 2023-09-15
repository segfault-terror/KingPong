import Logo from '@/components/Logo';
import ButtonPlay from './ButtonPlay';

export default function HomePage() {
    const welcomeMessage: string = `KingPong, a royal blend of classic nostalgia and modern excitement! Revive the hype of the original Pong game as you go on a thrilling journey. Will you claim the crown and become the ultimate Pong King? It's time to find out!`;


    return (
        <main className="bg-points bg-cover bg-no-repeat bg-center bg-fixed min-h-screen ">
            <Logo className="w-[100%] sm:w-[50%]" mylogo="/images/logo.svg" />
            <div
                className="text-center text-white
                xl:mt-32 lg:mt-24 md:mt-20 sm:mt-16 mt-12"
            >
                <h1
                    className="font-nicomoji
                    xl:text-9xl lg:text-8xl md:text-7xl sm:text-6xl text-5xl
                    mb-10"
                >
                    Welcome
                </h1>
                <p
                    className="font-jost
                    xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg text-md
                    xl:mx-80 lg:mx-64 md:mx-32 sm:mx-16 mx-10
                    leading-10"
                >
                    {welcomeMessage}
                </p>
            </div>
            <div className="flex justify-center mt-[5%] align-middle">
                <ButtonPlay root='/dashboard' className="text-center font-nicomoji items-center rounded-full px-5 py-2  sm:px-16 sm:py-3 bg-secondary-200 hover:border-secondary-500 border-background border-t-4 border-b-4 text-primary" />
            </div>
            <div className="flex justify-between">
                <Logo
                    className=" fixed left-0 top-[60%] w-[20%] sm-[50%]"
                    mylogo="/images/dotted-circle.svg"
                />
                <Logo
                    className="fixed bottom-0 right-0 sm:h-[40%] h-[20%]"
                    mylogo="/images/shadow-circle.svg"
                />
            </div>
        </main>
    );
}
