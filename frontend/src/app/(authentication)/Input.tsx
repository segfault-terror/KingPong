import React, { HtmlHTMLAttributes, useState } from 'react';
import { customAlphabet } from 'nanoid';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

type InputProps = HtmlHTMLAttributes<HTMLInputElement> & {
    id: string;
    children?: React.ReactNode;
    type?: string;
    placeholder?: string;
};

function ShowButton({ isShown }: { isShown: boolean }) {
    if (!isShown) {
        return (
            <MdVisibility className="text-white absolute top-[50%] right-2" />
        );
    }
    return (
        <MdVisibilityOff className="text-white absolute top-[50%] right-2" />
    );
}

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { id, children, type = 'text', placeholder, ...rest }: InputProps,
        ref,
    ) => {
        const [isShown, setIsShown] = useState(false);
        const [value, setValue] = useState('');
        id = id ?? nanoid();
        if (type === 'password') {
            return (
                <div className="relative">
                    <input
                        id={id}
                        autoComplete="off"
                        type={isShown ? 'text' : 'password'}
                        placeholder="Full Name"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300
                        focus:outline-none focus:border-secondary-200 bg-transparent
                        font-mulish text-white pl-1"
                        ref={ref}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        {...rest}
                    />
                    <label
                        htmlFor={id}
                        className="absolute left-0 -top-3.5 text-[#ccc] text-sm
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                        transition-all peer-focus:-top-3.5 peer-focus:text-[#ccc] peer-focus:text-sm peer-placeholder-shown:pl-1
                        font-mulish pl-0 select-none peer-focus:pl-0"
                    >
                        {children ?? placeholder}
                    </label>
                    <button
                        type="button"
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
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300
                    focus:outline-none focus:border-secondary-200 bg-transparent
                    font-mulish text-white pl-1"
                    ref={ref}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    {...rest}
                />
                <label
                    htmlFor={id}
                    className="absolute left-0 -top-3.5 text-[#ccc] text-sm
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                    transition-all peer-focus:-top-3.5 peer-focus:text-[#ccc] peer-focus:text-sm peer-placeholder-shown:pl-1
                    font-mulish pl-0 select-none peer-focus:pl-0"
                >
                    {children ?? placeholder}
                </label>
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
