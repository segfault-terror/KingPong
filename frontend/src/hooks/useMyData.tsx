import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useInvite() {
    const { data: me, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    });

    return { me };
}
