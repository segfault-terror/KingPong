import React from 'react';
import table from './table.svg';
import Logo from '@/components/Logo';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <Logo className="w-[50%]" mylogo="/images/logo.svg" />
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="col-span-1 lg:w-1/2 lg:m-auto">{children}</div>
                <div className="hidden lg:block overflow-hidden w-full h-full">
                    <img src={table.src} alt="table" />
                </div>
            </div>
        </>
    );
}
