'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { ReactNode } from 'react';

export default function ChatMenu() {
    const pathname = usePathname();

    return (
        <ul
            className="w-36 p-2 text-center bg-background
                        flex flex-col gap-2
                        border-[1px] border-secondary-200 rounded-2xl"
        >
            {pathname.startsWith('/chat/dm') ? (
                <DmMenu username={path.basename(pathname)} />
            ) : (
                <ChannelMenu />
            )}
        </ul>
    );
}

function ChatMenuItem(props: { children: ReactNode }) {
    return (
        <li className="text-silver hover:bg-primary hover:rounded-xl py-1">
            {props.children}
        </li>
    );
}

function DmMenu(props: { username: string }) {
    return (
        <>
            <ChatMenuItem>
                <Link href={`/profile/${props.username}`}>View Profile</Link>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Invite to Game</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Block</button>
            </ChatMenuItem>
        </>
    );
}

function ChannelMenu() {
    return (
        <>
            <ChatMenuItem>
                <button>Channel</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Channel</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Channel</button>
            </ChatMenuItem>
        </>
    );
}
