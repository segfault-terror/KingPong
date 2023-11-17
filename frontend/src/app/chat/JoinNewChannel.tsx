import { modalContext } from '@/contexts/contexts';
import { useContext, useEffect, useState } from 'react';
import Loading from '../loading';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ToggleButton from './ToggleButton';
import JoinPrivateChannelForm from './JoinPrivateChannelForm';

function filterChannels(query: string, channels: any[]) {
    return channels.filter((channel) => {
        const channelName = channel.name.toLowerCase();
        return channelName.includes(query.toLowerCase());
    });
}

export default function JoinNewChannel() {
    const [results, setResults] = useState<any[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    const { setJoinChannel, setWelcomeChannel, setChannel } =
        useContext(modalContext);
    const [toggle, setToggle] = useState<boolean>(false);

    const { data: channels, isLoading } = useQuery({
        queryKey: ['channels', 'explore'],
        queryFn: async () => {
            const { data: channels } = await axios.get(
                `/api/chat/channels/join/explore`,
                {
                    withCredentials: true,
                },
            );
            return channels;
        },
    });

    useEffect(() => {
        setResults(channels);
    }, [channels]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    if (!results) return null;

    return (
        <>
            <div className="w-[45%] mx-auto mb-6">
                <ToggleButton
                    toggle={toggle}
                    setToggle={setToggle}
                    message1="Join Private Channel"
                    message2="Join Channel"
                />
            </div>
            {toggle ? (
                <JoinPrivateChannelForm />
            ) : (
                <form
                    className="text-white accent-secondary-200
						flex flex-col gap-2 font-jost"
                >
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(event) => {
                            const query = event.target.value;
                            const newResults = filterChannels(query, channels);
                            if (query !== '' && newResults.length === 0)
                                setNoResults(true);
                            else setNoResults(false);
                            setResults(newResults);
                        }}
                        className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1"
                    />
                    {noResults && (
                        <div className="hover:bg-background/80 hover:rounded-xl block w-full text-left p-1">
                            <p>No results found!</p>
                        </div>
                    )}
                    {channels.length !== 0 && !noResults && (
                        <ul
                            className="bg-primary border-[0.5px] border-secondary-200 p-2 max-h-36
							overflow-y-scroll scrollbar-thumb-secondary-200 scrollbar-thin"
                        >
                            {results.map((result, idx) => (
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setJoinChannel(false);
                                        setWelcomeChannel(true);
                                        setChannel({
                                            name: result.name,
                                            visibility:
                                                result.type.toLowerCase(),
                                        });
                                    }}
                                    key={idx}
                                    className="hover:bg-background/80 hover:rounded-xl block w-full text-left p-1"
                                >
                                    <li className="flex justify-between">
                                        <p># {result.name}</p>
                                        <p className="text-cube_palette-200">
                                            {result.type.toLowerCase()}
                                        </p>
                                    </li>
                                </button>
                            ))}
                        </ul>
                    )}{' '}
                    {!noResults && channels.length === 0 && (
                        <p className="text-center text-silver">
                            No channels to join
                        </p>
                    )}
                </form>
            )}
        </>
    );
}
