'use client';
import { useEffect } from 'react';
import DmConversation from '../../DmConversation';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

type UsernameDMProps = {
    params: {
        username: string;
    };
};

export default function UsernameDM({ params }: UsernameDMProps) {
    const queryClient = useQueryClient();

    useEffect(() => {
        async function readMessages() {
            await axios.post(`/api/chat/dm/read/${params.username}`, {
                withCredentials: true,
            });
            queryClient.invalidateQueries(['notifications', 'chat'], {
                exact: true,
            });
        }
        readMessages();
    });

    return <DmConversation userName={params.username} />;
}
