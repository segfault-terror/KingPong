'use client';
import { useEffect, useState } from 'react';
import Page from './page';
import Tfa from '@/app/(dashboard)/settings/tfa';
import { createContext } from 'react';

export const ModalContext = createContext(
    {} as { toggle: boolean; setToggle: (toggle: boolean) => void; tfa: boolean; setTfa: (tfa: boolean) => void },
);

export default function layout() {
    const [toggle, setToggle] = useState<boolean>(false);
    const [tfa, setTfa] = useState<boolean>(false);

    const useTfa = (tfa: boolean) => {
        setTfa(tfa);
    }

    useEffect(() => {}, [toggle, tfa]);

    return (
        <>
            {toggle && (
                <Tfa toggle={toggle} useToggle={() => setToggle(false)} setTfa={useTfa} />
            )}
            <ModalContext.Provider
                value={{
                    toggle,
                    setToggle,
                    tfa,
                    setTfa,
                }}
            >
                {<Page />}
            </ModalContext.Provider>
        </>
    );
}
