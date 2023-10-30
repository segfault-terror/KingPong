'use client';
import { useState } from 'react';
import Page from './page';
import Tfa from '@/app/(dashboard)/settings/tfa';
import { TfaContext } from '@/contexts/contexts';

export default function Layout() {
    const [toggle, setToggle] = useState(false);
    const [tfa, setTfa] = useState(false);

    return (
        <>
            {toggle && (
                <Tfa toggle={toggle} onToggle={setToggle} setTfa={setTfa} />
            )}
            <TfaContext.Provider
                value={{
                    toggle,
                    setToggle,
                    tfa,
                    setTfa,
                }}
            >
                {<Page />}
            </TfaContext.Provider>
        </>
    );
}
