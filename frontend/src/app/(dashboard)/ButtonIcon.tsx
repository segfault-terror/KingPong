import React, { HtmlHTMLAttributes } from 'react';

type Props = {
    children: React.ReactNode;
    rest?: HtmlHTMLAttributes<HTMLButtonElement>;
};

export default function ButtonIcon({ children, ...rest }: Props) {
    const renderIcon = () => {
        return React.cloneElement(children as React.ReactElement, {
            className: 'w-6 h-6',
        });
    };
    return (
        <div
            className="w-9 h-9 bg-primary flex items-center justify-center rounded-3xl relative
                    before:w-0 before:h-0 before:rounded-3xl before:absolute before:bg-background 
                    hover:before:h-9 hover:before:w-9 before:transition-all before:duration-200
                    "
        >
            <button className="text-secondary-200 z-10" {...rest}>
                {renderIcon()}
            </button>
        </div>
    );
}
