'use client';
import Modal from '@/app/chat/Modal';
import { createContext, useState } from 'react';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

type ProfileModalContextProps = {
    achievements: boolean;
    setAchievements: (value: boolean) => void;
    friends: boolean;
    setFriends: (value: boolean) => void;
    matches: boolean;
    setMatches: (value: boolean) => void;
};

export const ProfileModalContext = createContext(
    {} as ProfileModalContextProps,
);

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const [achievements, setAchievements] = useState(false);
    const [friends, setFriends] = useState(false);
    const [matches, setMatches] = useState(false);

    return (
        <>
            {achievements && (
                <Modal onClose={() => setAchievements(false)}>
                    <p>achievement list modal</p>
                </Modal>
            )}
            {friends && (
                <Modal onClose={() => setFriends(false)}>
                    <p>friends list modal</p>
                </Modal>
            )}
            {matches && (
                <Modal onClose={() => setMatches(false)}>
                    <p>matches list modal</p>
                </Modal>
            )}
            <ProfileModalContext.Provider
                value={{
                    achievements,
                    setAchievements,
                    friends,
                    setFriends,
                    matches,
                    setMatches,
                }}
            >
                {children}
            </ProfileModalContext.Provider>
        </>
    );
}
