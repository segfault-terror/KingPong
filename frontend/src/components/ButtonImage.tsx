import React, { HtmlHTMLAttributes } from 'react';

type Props = HtmlHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export default function ButtonImage(props: Props) {
    const { children, ...rest } = props;
    const renderImage = () => {
        return React.cloneElement(children as React.ReactElement, {
            className: 'w-9 h-9 object-cover',
        });
    };
    return (
        <div
            className="w-9 h-9 bg-primary flex items-center justify-center rounded-3xl relative
                    border-2 border-secondary-200 overflow-hidden
                    "
        >
            <button {...rest} className="text-secondary-200 z-10">
                {renderImage()}
            </button>
        </div>
    );
}
