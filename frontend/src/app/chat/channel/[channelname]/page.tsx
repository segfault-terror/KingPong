import React from 'react';
import ChannelConversation from '../../ChannelConversation';

type ChannelProps = {
    params: {
        channelname: string;
    };
};

export default function Channel({ params }: ChannelProps) {
    return <ChannelConversation channelName={params.channelname} />;
}
