import { Channel } from '@/app/chat/JoinNewChannel';
import { createContext } from 'react';

type ProfileModalContextProps = {
    achievements: boolean;
    setAchievements: (value: boolean) => void;
    matches: boolean;
    setMatches: (value: boolean) => void;
};

type ToggleProps = {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
};

type ModalContextProps = {
    createChannel: boolean;
    joinChannel: boolean;
    setCreateChannel: (val: boolean) => void;
    setJoinChannel: (val: boolean) => void;
    welcomeChannel: boolean;
    setWelcomeChannel: (val: boolean) => void;
    setChannel: (channel: Channel) => void;
    newConversation: boolean;
    setNewConversation: (val: boolean) => void;
    dotsDropdown: boolean;
    setDotsDropdown: (val: boolean) => void;
};

type ChannelModalContextProps = {
    showMembers: boolean;
    setShowMembers: (value: boolean) => void;
};

export const profileModalContext = createContext(
    {} as ProfileModalContextProps,
);
export const modalContext = createContext({} as ModalContextProps);
export const toggleContext = createContext<ToggleProps>({} as ToggleProps);
export const channelModalContext = createContext(
    {} as ChannelModalContextProps,
);

export const TfaContext = createContext(
    {} as {
        toggle: boolean;
        setToggle: (toggle: boolean) => void;
        tfa: boolean;
        setTfa: (tfa: boolean) => void;
    },
);
