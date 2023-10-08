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
        <div>
            <h1 className="text-center text-2xl">
                Channel {params.channelname}
            </h1>
            <ChannelConversation {...ChannelConversations.segfault_terror} />
        </div>
    );
}
