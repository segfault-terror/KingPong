'use client';

import DmConversation, { DmConversationProps } from '../../DmConversation';
import { DMConversations } from '../../data/ChatData';

type UsernameDMProps = {
    params: {
        username: string;
    };
};

export default function UsernameDM({ params }: UsernameDMProps) {
    const props: DmConversationProps = DMConversations[params.username];
    return <DmConversation {...props} />;
}
