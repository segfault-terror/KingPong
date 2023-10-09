"use client";
import { createContext, useState } from 'react';

type ToggleProps = {
	toggle: boolean;
	setToggle: (toggle: boolean) => void;
};

export const ToggleContext = createContext<ToggleProps>({} as ToggleProps);

type MainChatLayoutProps = {
	children: React.ReactNode;
};

export default function MainChatLayout( {children}: MainChatLayoutProps) {
	const [toggle, setToggle] = useState<boolean>(false);

    return (
		<ToggleContext.Provider value={{toggle, setToggle}}>
			{children}
		</ToggleContext.Provider>
	);
}