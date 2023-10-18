import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UserStatus } from '../../chat/DirectMessage';

export type UserCircleInfoProps = {
    username: string;
};

export default function UserCircleInfo({ username }: UserCircleInfoProps) {
    const { data } = useQuery({
        queryKey: ['profile', username],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:3000/user/get/${username}/stats`,
                {
                    withCredentials: true,
                },
            );
            console.log(data);
            return data;
        },
    });

    return (
        <div className="rounded-full w-24 h-24 md:w-32 md:h-32">
            <div className="rounded-full w-full h-full overflow-hidden">
                <img
                    src={data?.avatar}
                    alt={`${username}'s avatar`}
                    className="rounded-full object-cover w-full h-full border-4 border-secondary-200"
                />
                <div
                    className="text-primary bg-secondary-200
                                text-center text-sm font-bold font-jost
                                h-[30%]
                                relative bottom-[20%]"
                >
                    {data?.stats.level}
                </div>
            </div>
            <div
                className={`${data?.status === 'ONLINE' && 'bg-online'}
                ${data?.status === 'OFFLINE' && 'bg-inactive-200'}
                ${data?.status === 'INGAME' && 'bg-ingame'}
                        relative bottom-[25%] left-[80%]
                        w-3 h-3 md:w-4 md:h-4 rounded-full`}
            ></div>
        </div>
    );
}
