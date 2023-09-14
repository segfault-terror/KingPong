export default function HomePage() {

    return (
        <main className="bg-points bg-cover bg-no-repeat bg-center bg-fixed min-h-screen">
        <div className="flex w-[100%] sm:w-[50%]">
            <img src="/images/logo.svg" alt="logo" />
        </div>

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
                xl:mx-96 lg:mx-80 md:mx-64 sm:mx-32 mx-16"
            >
                KingPong, a royal blend of classic nostalgia and modern
                excitement! Revive the hype of the original Pong game as you
                go on a thrilling journey. Will you claim the crown and
                become the ultimate Pong King? It&apos;s time to find out!
            </p>
        </div>
    </main>
    );
}
