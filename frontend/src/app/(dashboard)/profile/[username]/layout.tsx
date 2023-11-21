'use client';
import Modal from '@/components/Modal';
import { profileModalContext } from '@/contexts/contexts';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useState } from 'react';
import AchievementModal from '../AchievementModal';
import GameResultModal from '../MatchHistoryModal';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const [achievements, setAchievements] = useState(false);
    const [matches, setMatches] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {achievements && (
                <Modal
                    onClose={() => setAchievements(false)}
                    childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                        border-t border-b border-secondary-500 w-[90%]
                                        lg:w-2/3 max-w-[600px] max-h-[635px]
                                        overflow-y-auto
                                        scrollbar-thumb-secondary-200 scrollbar-thin"
                >
                    <AchievementModal userName={path.basename(pathname)} />
                </Modal>
            )}
            {matches && (
                <Modal
                    onClose={() => setMatches(false)}
                    childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl
                                        border-t border-b border-secondary-500 w-[90%]
                                        lg:w-2/3 max-w-[400px] max-h-[655px]
                                        overflow-y-auto
                                        scrollbar-thumb-secondary-200 scrollbar-thin"
                >
                    <GameResultModal userName={path.basename(pathname)} />
                </Modal>
            )}
            <profileModalContext.Provider
                value={{
                    achievements,
                    setAchievements,
                    matches,
                    setMatches,
                }}
            >
                {children}
            </profileModalContext.Provider>
        </>
    );
}
