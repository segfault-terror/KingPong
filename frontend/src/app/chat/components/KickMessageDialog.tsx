import Modal from '@/components/Modal';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ExitMessageDialog(props: {
    channelName: string;
    reason: 'kick' | 'ban' | 'delete';
}) {
    const [gotoChat, setGotoChat] = useState(false);

    useEffect(() => {
        if (!gotoChat) return;
        redirect('/chat');
    }, [gotoChat]);

    let reasonMessage = null;
    switch (props.reason) {
        case 'ban':
            reasonMessage = (
                <span>
                    You have been banned from{' '}
                    <span className="text-secondary-200">
                        #{props.channelName}
                    </span>
                </span>
            );
            break;
        case 'kick':
            reasonMessage = (
                <span>
                    You have been kicked from{' '}
                    <span className="text-secondary-200">
                        #{props.channelName}
                    </span>
                </span>
            );
            break;
        case 'delete':
            reasonMessage = (
                <span>
                    Channel{' '}
                    <span className="text-secondary-200">
                        #{props.channelName}
                    </span>{' '}
                    has been deleted
                </span>
            );
            break;
    }

    return (
        <Modal
            // The only way to close this dialog is to click OK
            onClose={() => {}}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">{reasonMessage}</h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="OK"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        setGotoChat(true);
                    }}
                >
                    OK
                </button>
            </div>
        </Modal>
    );
}
