import Modal from '@/components/Modal';
import { useState } from 'react';
import { FaRegClipboard } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function InviteModal(props: {
    inviteCode: string;
    onClose: () => void;
}) {
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);

    function copyInviteCode() {
        let timeout: NodeJS.Timeout;

        return () => {
            clearTimeout(timeout);
            try {
                navigator.clipboard.writeText(props.inviteCode);
            } catch {
                console.info('set copy failed');
                setCopyFailed(true);
                timeout = setTimeout(() => setCopyFailed(false), 3000);
                return;
            }
            console.info('set copied');
            setCopied(true);
            timeout = setTimeout(() => setCopied(false), 1000);
        };
    }

    return (
        <Modal
            onClose={props.onClose}
            childrenClassName="bg-gradient-to-br from-primary to-background
                                px-6 py-16
                                rounded-2xl border-r border-l border-secondary-500
                                w-[90%] lg:w-2/3 max-w-[600px] h-[300px]"
        >
            <h1 className="font-jost text-center text-2xl text-secondary-200 mb-6">
                Invite users
            </h1>
            <p className="text-center font-light text-silver">
                Share this code with your friends so they can join
            </p>
            <div
                className="bg-background
                        text-center font-light text-silver
                        w-2/5 mx-auto mt-8 mb-4 py-2 px-4
                        rounded-xl border border-secondary-500
                        flex flex-row justify-between items-center"
            >
                <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-white">{props.inviteCode}</p>
                    <button
                        title="Copy to clipboard"
                        onClick={copyInviteCode()}
                    >
                        <FaRegClipboard className="text-secondary-500 w-6 h-6" />
                    </button>
                </div>
            </div>
            {copied && (
                <motion.div
                    className="bg-green-500
                                px-4 py-2
                                w-2/5 mx-auto
                                text-center
                                rounded-xl
                                transition duration-1000"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0 }}
                >
                    Copied!
                </motion.div>
            )}
            {copyFailed && (
                <motion.div
                    className="bg-red-500
                                px-4 py-2
                                w-[70%] mx-auto
                                text-center
                                rounded-xl
                                transition duration-1000"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 0 }}
                >
                    Clipboard access denied, please copy manually
                </motion.div>
            )}
        </Modal>
    );
}
