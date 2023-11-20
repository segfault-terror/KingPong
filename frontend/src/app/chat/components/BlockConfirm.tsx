import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BlockConfirm(props: {
    username: string;
    setShowBlockConfirm: Function;
}) {
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: async () => {
            return await axios.post(`/api/friends/block/${props.username}`, {
                withCredentials: true,
                username: props.username,
            });
        },
    });

    return (
        <>
            <h1 className="text-center text-xl font-jost">
                Block{' '}
                <span className="text-secondary-200">@{props.username}</span>?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    className="bg-background rounded-2xl px-4
                        border border-white text-secondary-200
                        font-jost hover:bg-secondary-200 hover:text-background"
                    onClick={() => {
                        mutate();
                        router.replace('/chat');
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                        border border-white text-red-400
                        font-jost hover:bg-red-400 hover:text-background"
                    onClick={() => props.setShowBlockConfirm(false)}
                >
                    Cancel
                </button>
            </div>
        </>
    );
}
