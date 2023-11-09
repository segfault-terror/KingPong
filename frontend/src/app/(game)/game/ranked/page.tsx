'use client'
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Page() {
	const { data: me, isLoading: meLoading } = useQuery(
        ['me'],
        async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    );

    if (meLoading) return <Loading />;
	console.log(me);
	return <div>Ranked</div>;
}
