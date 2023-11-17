import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useInvite() {
    const queryClient = useQueryClient();

    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (data: any) => {
            console.log(data);
            return await axios.post('/api/notifications/create', {
                userId: me.id,
                sendToId: data.id,
                type: data.type,
                ChallengeId: data.type === 'GAME' ? data.ChallengeId : null,
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications', 'notreaded'], {
                exact: true,
            });
        },
    });

    return { mutate };
}
