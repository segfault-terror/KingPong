'use client';
import{ useState } from 'react';
import Page from './page';
import Tfa from '@/app/(dashboard)/settings/tfa';
import { ModalContext } from '@/contexts/contexts';

export default function Layout() {
    const [toggle, setToggle] = useState(false);
    const [tfa, setTfa] = useState(false);

    return (
        <>
            {toggle && (
                <Tfa toggle={toggle} onToggle={setToggle} setTfa={setTfa} />
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
