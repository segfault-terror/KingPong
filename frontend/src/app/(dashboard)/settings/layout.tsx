'use client';
import { useState } from 'react';
import Page from './page';
import Tfa from '@/components/tfa';
import { createContext } from 'react';

export const ModalContext = createContext(
    {} as { toggle: boolean; setToggle: (toggle: boolean) => void },
);

export default function layout() {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <>
            {toggle && (
                <Tfa toggle={toggle} useToggle={() => setToggle(false)} />
            )}
            <ModalContext.Provider
                value={{
                    toggle,
                    setToggle,
                }}
            >
                {<Page />}
            </ModalContext.Provider>
        </>
    );
}
