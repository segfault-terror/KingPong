import React, { ReactNode } from 'react';
import Page from './game/page';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return <Page>{children}</Page>;
}
