import { useContext, useState } from 'react';
import { Channels } from './data/ChatData';
import { ModalContext } from './layout';

function filterChannels(query: string) {
    return Channels.filter((channel) => {
        const channelName = channel.name.toLowerCase();

        return channelName.includes(query.toLowerCase());
    });
}

export type Channel = {
    name: string;
    visibility: string;
};

export default function JoinNewChannel() {
    const [results, setResults] = useState<Channel[]>([]);
    const { setJoinChannel, setWelcomeChannel, setChannel } =
        useContext(ModalContext);

    return (
        <form
            className="text-white accent-secondary-200
						flex flex-col gap-2 font-jost"
        >
            <h1 className="text-secondary-200 text-center text-2xl mb-4">
                Join Channel
            </h1>

            <input
                type="text"
                placeholder="Search"
                onChange={(event) => {
                    const query = event.target.value;
                    if (query === '') {
                        setResults([]);
                        return;
                    }
                    const newResults = filterChannels(query);
                    setResults(newResults);
                }}
                className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1"
            />
            {results.length !== 0 && (
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
                                    visibility: result.visibility,
                                });
                            }}
                            key={idx}
                            className="hover:bg-background/80 hover:rounded-xl block w-full text-left p-1"
                        >
                            <li className="flex justify-between">
                                <p># {result.name}</p>
                                <p className="text-cube_palette-200">
                                    {result.visibility}
                                </p>
                            </li>
                        </button>
                    ))}
                </ul>
            )}
        </form>
    );
}
