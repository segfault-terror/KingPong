import CardAbout from './CardAbout';
import Image from 'next/image';
import line from '/public/images/about-lines.svg';

const Animation = () => {
    return (
        <div className="w-full max-w-lg z-0">
            <div className="absolute top-0 left-4 w-36 h-36 rounded-full bg-cyan-300  filter blur-xl animate-blob"></div>
            <div className="absolute top-0 left- w-36 h-36 rounded-full bg-secondary-200  filter blur-xl animate-blob1"></div>
            <div className="absolute top-10 left-16 w-36 h-36 rounded-full bg-background  filter blur-xl animate-blob2"></div>
        </div>
    );
};
//grid sm:grid-row-5 items-center
export default function About() {
    return (
        <div className="relative h-screen">
            <div className="flex flex-col relative z-10">
                <div className="my-6 flex justify-center text-white drop-shadow-neon-white text-4xl border-red-400 border-2 col-span-2">
                    About
                </div>
                <div className="text-sm text-[#E6E6E6]  md:absolute md:inset-0 flex justify-center items-center">
                    <div className='bg-blend-darken backdrop-blur backdrop-brightness-75 shadow-inner rounded-xl z-20'>
                        <div className="m-4">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <div className="my-2 border-2 border-yellow-300 col-span-4 flex justify-start">
                        <CardAbout
                            firstName="Aymane"
                            LastName="Aggoujjil"
                            links={['', '', '']}
                            description=""
                            image="https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg"
                            className="animate-dragR w-full h-auto"
                        />
                    </div>
                    <div className="my-2 border-2 border-yellow-300 col-span-4 flex justify-end">
                        <CardAbout
                            firstName="Omar"
                            LastName="Aizab"
                            links={['', '', '']}
                            description=""
                            image="https://cdn.intra.42.fr/users/10ebb5a3e3bf8fdf210566bfe0a102e0/oaizab.jpg"
                            className="animate-dragL w-full h-auto"
                        />
                    </div>
                    <div className="my-2 border-2 border-yellow-300 col-span-4 flex justify-start">
                        <CardAbout
                            firstName="Moussa"
                            LastName="Seddik"
                            links={['', '', '']}
                            description=""
                            image="https://cdn.intra.42.fr/users/811c6da3283271dcc1794c667938159c/moseddik.jpg"
                            className="animate-dragR w-full h-auto"
                        />
                    </div>
                    <div className="my-2 border-2 border-yellow-300 col-span-4 flex justify-end">
                        <CardAbout
                            firstName="Hamza"
                            LastName="Haddani"
                            links={['', '', '']}
                            description=""
                            image="https://cdn.intra.42.fr/users/40ff48680a112910914c132211cbc9a3/hhamza.jpg"
                            className="animate-dragL w-full h-auto"
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center absolute inset-0 z-0">
                <Animation />
            </div>
        </div>
    );
}
