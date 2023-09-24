import CardAbout from './CardAbout';
import Image from 'next/image';
import line from '/public/images/about-lines.svg';

const Animation = () => {
    return (
        <div className="relative w-full max-w-lg">
            <div className="absolute top-0 left-4 w-36 h-36 rounded-full bg-cyan-300  filter blur-xl animate-blob"></div>
            <div className="absolute top-0 left- w-36 h-36 rounded-full bg-secondary-200  filter blur-xl animate-blob1"></div>
            <div className="absolute top-10 left-16 w-36 h-36 rounded-full bg-background  filter blur-xl animate-blob2"></div>
        </div>
    );
};
//grid sm:grid-row-5 items-center
export default function About() {
    return (
        <div className="flex flex-col justify-center">
            <div className="my-6 flex justify-center text-white drop-shadow-neon-white text-lg">
                About
            </div>
            <div className="text-sm text-[#E6E6E6] z-10">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages
            </div>
			<div className="flex justify-center" >
				<Animation />
			</div>
            <div className="flex justify-start my-1">
                <CardAbout
                    firstName="Aymane"
                    LastName="Aggoujjil"
                    links={['', '', '']}
                    description=""
                    image="https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg"
                />
            </div>
            <div className="flex justify-end my-1">
                <CardAbout
                    firstName="Omar"
                    LastName="Aizab"
                    links={['', '', '']}
                    description=""
                    image="https://cdn.intra.42.fr/users/10ebb5a3e3bf8fdf210566bfe0a102e0/oaizab.jpg"
                />
            </div>
            <div className="flex justify-start my-1">
                <CardAbout
                    firstName="Moussa"
                    LastName="Seddik"
                    links={['', '', '']}
                    description=""
                    image="https://cdn.intra.42.fr/users/811c6da3283271dcc1794c667938159c/moseddik.jpg"
                />
            </div>
            <div className="flex justify-end my-1">
                <CardAbout
                    firstName="Hamza"
                    LastName="Haddani"
                    links={['', '', '']}
                    description=""
                    image="https://cdn.intra.42.fr/users/40ff48680a112910914c132211cbc9a3/hhamza.jpg"
                />
            </div>
        </div>
    );
}
