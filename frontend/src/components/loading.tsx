'use client';

import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import { useRef } from 'react';

export const MovingAnimation = ({
    children,
    duration = 2000,
    rx,
    ry,
    ...otherProps
}: any) => {
    const pathRef = useRef<any>();
    const progress = useMotionValue<number>(0);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength();
        if (length) {
            const pxPerMillisecond = length / duration;
            progress.set((time * pxPerMillisecond) % length);
        }
    });

    const x = useTransform(
        progress,
        (val) => pathRef.current?.getPointAtLength(val).x,
    );
    const y = useTransform(
        progress,
        (val) => pathRef.current?.getPointAtLength(val).y,
    );

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
                width="100%"
                height="100%"
                {...otherProps}
            >
                <rect
                    fill="none"
                    width="100%"
                    height="100%"
                    rx={rx}
                    ry={ry}
                    ref={pathRef}
                />
            </svg>
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // display: 'inline-block',
                    transform,
                    zIndex: -1,
                }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default function Loading() {
    const borderRadius = '1.75rem';
    return (
        <div className="min-h-screen bg-center bg-cover flex items-center justify-center relative overflow-hidden">
            <div className="bg-transparent relative text-xl  w-40 h-24 sm:w-40 sm:h-24 md:w-48 md:h-32 lg:w-60 lg:h-40 xl:w-80 xl:h-52 rounded-2xl p-[1px] overflow-hidden ">
                <div className="absolute inset-0 rounded-2xl">
                    <MovingAnimation duration={2500} rx="30%" ry="30%">
                        <div
                            style={{
                                background:
                                    'radial-gradient(var(--inactive) 40%, transparent 60%)',
                            }}
                            className="h-24 w-24 opacity-[0.8] "
                        />
                    </MovingAnimation>
                </div>
                <div className="relative bg-gradient-radial from-[#4A4A4A] to-[#010101]  backdrop-blur-xl  flex items-center justify-center w-full h-full text-sm antialiased rounded-2xl">
                    <div className="h-4 w-[4px] lg:h-5 lg:w-[5px]  xl:h-7 xl:w-[6px] border-[1px] rounded-l-xl bg-neutral-200 mx-2 animate-loading-ping absolute left-[1%] "></div>
                    <div className="w-[4px] h-[4px] lg:w-2 lg:h-2 xl:w-2 xl:h-2 rounded-full absolute animate-loading-ball bg-slate-300"></div>
                    <div className="h-4 w-[4px] lg:h-5 lg:w-[5px] xl:h-7 xl:w-[6px] border-[1px] rounded-r-xl bg-neutral-200 mx-2 animate-loading-pong absolute right-[1%]"></div>
                </div>
            </div>
        </div>
    );
}
