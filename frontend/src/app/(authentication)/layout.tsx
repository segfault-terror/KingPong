import React from 'react';
import table from './table.svg';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 lg:w-1/2 lg:m-auto">{children}</div>
            <div className="hidden lg:block overflow-hidden mt-12">
                <img src={table.src} alt="table" />
            </div>
        </div>
    );
}
