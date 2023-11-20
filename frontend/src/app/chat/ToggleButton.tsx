'use client';
import { motion } from 'framer-motion';

export default function ToggleButton({
    toggle,
    setToggle,
    message1,
    message2,
}: {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    message1: string;
    message2: string;
}) {
    return (
        <div
            onClick={() => setToggle(!toggle)}
            className={`flex items-center border-2 border-secondary-200
                    w-full h-8
                    cursor-pointer
                    rounded-2xl
                    ${toggle ? 'flex-row-reverse' : 'flex-row'} p-1`}
        >
            <motion.div
                className="h-6 w-6
                        bg-gradient-radial from-secondary-200 from-40% to-white
                        rounded-full"
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            ></motion.div>
            <p
                className="text-center text-xs select-none text-secondary-200 font-jost
                        flex-grow flex justify-center"
            >
                {toggle ? message1 : message2}
            </p>
        </div>
    );
}
