import bar from './bar.svg';
import ball from './ball.svg';
import Image from 'next/image';

export default function Board({ className }: { className?: string }) {
    return (
        <div
            className={`
                    w-[500px] h-[800px] 
                    border-[7px] border-secondary-500 rounded-[32px]
                    drop-shadow-[0_0_20px_rgba(255,168,42,1)]
                    bg-gradient-radial from-primary from-[40%] to-[#1E0837] to-[90%]
                    relative ${className ? className : ''}`}
        >
            <Image
                width={160}
                height={22}
                className="absolute rotate-180 animate-moveTop -translate-x-1/2"
                src={bar.src}
                alt="bar"
            />
            <Image
                className="absolute animate-playball"
                width={34}
                height={34}
                src={ball.src}
                alt="ball"
            />
            <Image
                width={160}
                height={22}
                className="absolute bottom-0 animate-moveBottom -translate-x-1/2"
                src={bar.src}
                alt="bar"
            />
        </div>
    );
}
