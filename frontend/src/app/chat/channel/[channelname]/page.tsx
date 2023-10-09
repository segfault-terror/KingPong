import React from 'react';
import { ChannelConversations } from '@/app/chat/data/ChatData';
import ChannelConversation from '../../ChannelConversation';

type ChannelProps = {
    params: {
        channelname: string;
    };
};

export default function Channel({ params }: ChannelProps) {
    return (
        <ChannelConversation
            {...ChannelConversations[
                params.channelname as keyof typeof ChannelConversations
            ]}
        />
    );
}
