'use client';
import React, { useEffect, useState } from 'react';
import ChannelConversation from '../../ChannelConversation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import WelcomeChannel from '../../WelcomeChannel';
import Modal from '@/components/Modal';

type ChannelProps = {
    params: {
        channelname: string;
    };
};

export default function Channel({ params }: ChannelProps) {
    const { data, isLoading } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            const { data: channels } = await axios.get(
                `/api/chat/channels/${me.username}`,
                { withCredentials: true },
            );
            const { data: channel } = await axios.get(
                `/api/chat/channel/${params.channelname}`,
                { withCredentials: true },
            );

            const isMember = channels.some(
                (channel: any) => channel.name === params.channelname,
            );

            return {
                isMember,
                type: channel.type,
            };
        },
    });

    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        if (isLoading || !data) return;

        console.log(`channel page:`);
        console.dir(data);
        if (!data?.isMember) {
            if (data?.type === 'PRIVATE') redirect('/not-found');
            else setShowWelcome(true);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {showWelcome && (
                <Modal
                    childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%] h-[300px]
                                        lg:w-2/3 max-w-[600px] z-[49]"
                    onClose={() => {}}
                >
                    <WelcomeChannel
                        channelName={params.channelname}
                        channelVisibility={data?.type.toLowerCase()}
                        setWelcomeChannel={setShowWelcome}
                        setJoinChannel={() => {}}
                        notAMember={true}
                    />
                </Modal>
            )}
            <ChannelConversation channelName={params.channelname} />
        </>
    );
}
