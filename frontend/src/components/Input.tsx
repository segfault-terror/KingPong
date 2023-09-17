import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

type InputProps = {
    id: string;
    children?: React.ReactNode;
    type: string;
    placeholder?: string;
};

function ShowButton({ isShown }: { isShown: boolean }) {
    if (!isShown) {
        return (
            <MdVisibility className="absolute right-2 top-[50%] text-white" />
        );
    }
    return (
        <MdVisibilityOff className="absolute right-2 top-[50%] text-white" />
    );
}

export default function Input({ id, children, type, placeholder }: InputProps) {
    const [isShown, setIsShown] = useState(false);
    if (type === 'password') {
        return (
            <div className="relative">
                <input
                    id={id}
                    autoComplete="off"
                    type={isShown ? 'text' : 'password'}
                    placeholder="Full Name"
                    className="focus:border-secondary-200 font-mulish peer h-10 w-full border-b-2
                    border-gray-300 bg-transparent pl-1
                    text-white placeholder-transparent focus:outline-none"
                />
                <label
                    htmlFor={id}
                    className="font-mulish absolute -top-3.5 left-0 select-none
                    pl-0 text-sm text-[#ccc]
                    transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:pl-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-3.5 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-[#ccc]"
                >
                    {children ?? placeholder}
                </label>
                <button
                    onClick={() => {
                        setIsShown(!isShown);
                    }}
                >
                    <ShowButton isShown={isShown} />
                </button>
            </div>
        );
    }
    return (
        <div className="relative">
            <input
                id={id}
                autoComplete="off"
                type={type}
                placeholder="Full Name"
                className="focus:border-secondary-200 font-mulish peer h-10 w-full border-b-2
                    border-gray-300 bg-transparent pl-1
                    text-white placeholder-transparent focus:outline-none"
            />
            <label
                htmlFor={id}
                className="font-mulish absolute -top-3.5 left-0 select-none
                    pl-0 text-sm text-[#ccc]
                    transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:pl-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-3.5 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-[#ccc]"
            >
                {children ?? placeholder}
            </label>
        </div>
    );
}
