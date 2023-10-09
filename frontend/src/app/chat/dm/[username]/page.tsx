'use client';

import DmConversation, { DmConversationProps } from '../../DmConversation';
import { DMConversations } from '../../data/ChatData';

type UsernameDMProps = {
    params: {
        username: string;
    };
};

export default function UsernameDM({ params }: UsernameDMProps) {
    return <DmConversation userName={params.username} />;
}
