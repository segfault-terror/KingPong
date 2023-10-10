'use client';
import { createContext, useState } from 'react';

type ToggleProps = {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
};

type ModalContextProps = {
    createChannel: boolean;
    setCreateChannel: (val: boolean) => void;
};

export const ModalContext = createContext({} as ModalContextProps);
export const ToggleContext = createContext<ToggleProps>({} as ToggleProps);

type MainChatLayoutProps = {
    children: React.ReactNode;
};

export default function MainChatLayout({ children }: MainChatLayoutProps) {
    const [toggle, setToggle] = useState<boolean>(false);
    const [createChannel, setCreateChannel] = useState(false);

    return (
        <ToggleContext.Provider value={{ toggle, setToggle }}>
            <ModalContext.Provider value={{ createChannel, setCreateChannel }}>
                {children}
            </ModalContext.Provider>
        </ToggleContext.Provider>
    );
}
