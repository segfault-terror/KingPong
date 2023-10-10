'use client';
import { BiMessageAdd } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import { useContext } from 'react';
import { ModalContext } from './layout';

function EmptyDM() {
    return (
        <div
            className="grid justify-center align-center
                        text-center text-cube_palette-200"
        >
            <BiMessageAdd className="w-20 h-20 mx-auto" />
            <h1 className="text-2xl">Your messages</h1>
            <p className="text-xs font-light mb-3">
                Send private messages to a friend
            </p>
            <button
                onClick={() => console.log('Send a message')}
                className="text-primary bg-secondary-200
                            text-xs font-bold font-jost
                            rounded-xl
                            py-2
                            inline-block w-32
                            mx-auto"
            >
                Send a message
            </button>
        </div>
    );
}

function EmptyChannels() {
    const { setCreateChannel } = useContext(ModalContext);

    return (
        <div
            className="grid justify-center align-center
                        text-center text-cube_palette-200"
        >
            <MdOutlineExplore className="w-20 h-20 mx-auto" />
            <h1 className="text-2xl">Your channels</h1>
            <p className="text-xs font-light mb-3">
                Create or join a new channel
            </p>
            <button
                onClick={() => setCreateChannel(true)}
                className="text-primary bg-secondary-200
                            text-xs font-bold font-jost
                            rounded-xl
                            py-2
                            inline-block w-32
                            mx-auto mb-2"
            >
                Create channel
            </button>
            <button
                onClick={() => console.log('Join channel')}
                className="text-primary bg-secondary-200
                            text-xs font-bold font-jost
                            rounded-xl
                            py-2
                            inline-block w-32
                            mx-auto"
            >
                Join channel
            </button>
        </div>
    );
}

type EmptyChatProps = {
    toggle: boolean;
};

export default function EmptyChat({ toggle }: EmptyChatProps) {
    return toggle ? <EmptyChannels /> : <EmptyDM />;
}
