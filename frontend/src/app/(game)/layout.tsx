import React, { ReactNode } from 'react';
import Page from './page';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
   return <Page>{children}</Page>;
}
