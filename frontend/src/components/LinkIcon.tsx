import Link from 'next/link';
import React, { HtmlHTMLAttributes } from 'react';

type Props = {
    children: React.ReactNode;
    href: string;
};

export default function LinkIcon({ children, href }: Props) {
    const renderIcon = () => {
        return React.cloneElement(children as React.ReactElement, {
            className: 'w-6 h-6',
        });
    };
    return (
        <div
            className="w-9 h-9 bg-primary flex items-center justify-center rounded-3xl relative
                    before:w-0 before:h-0 before:rounded-3xl before:absolute before:bg-background 
                    border border-secondary-500"
        >
            <Link href={href} className="text-secondary-200 z-10">
                {renderIcon()}
            </Link>
        </div>
    );
}
