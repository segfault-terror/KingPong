'use client';
import Modal from '@/app/chat/Modal';
import { createContext, useState } from 'react';
import AchievementModal from '../AchievementModal';
import { usePathname } from 'next/navigation';
import path from 'path';
import FriendListModal from '../FriendListModal';

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
    const pathname = usePathname();

    return (
        <>
            {achievements && (
                <Modal
                    onClose={() => setAchievements(false)}
                    childrenClassName="bg-background p-6 border-2 border-white w-[90%]
                                        lg:w-2/3 max-w-[600px] max-h-[635px]
                                        overflow-y-auto
                                        scrollbar-thumb-secondary-200 scrollbar-thin"
                >
                    <AchievementModal userName={path.basename(pathname)} />
                </Modal>
            )}
            {friends && (
                <Modal
                    onClose={() => setFriends(false)}
                    childrenClassName="bg-background p-6 border-2 border-white w-[90%]
                                        lg:w-2/3 max-w-[400px] max-h-[635px]
                                        overflow-y-auto
                                        scrollbar-thumb-secondary-200 scrollbar-thin"
                >
                    <FriendListModal userName={path.basename(pathname)} />
                </Modal>
            )}
            {matches && (
                <Modal
                    onClose={() => setMatches(false)}
                    childrenClassName="bg-background p-6 border-2 border-white w-[90%]
                                        lg:w-2/3 max-w-[600px]"
                >
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
