import React from 'react';
import table from './table.svg';
import Logo from '@/components/Logo';
import Board from './Board';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div>
                    <Logo className="w-[50%]" mylogo="/images/logo.svg" />
                    <div className="col-span-1 lg:w-1/2 lg:m-auto">
                        {children}
                    </div>
                </div>
                <div className="hidden lg:block overflow-hidden py-20 w-full h-full">
                    <Board className="rotate-[30deg] left-[25%]" />
                </div>
            </div>
        </div>
    );
}
