import { BsArrowLeftShort } from 'react-icons/bs';

type WelcomeChannelProps = {
    channelName: string;
    channelVisibility: string;
    setWelcomeChannel: (val: boolean) => void;
    setJoinChannel: (val: boolean) => void;
};

type ChannelContentProps = Pick<WelcomeChannelProps, 'channelName'>;

function PublicChannelContent({ channelName }: ChannelContentProps) {
    return (
        <p className="text-left text-silver font-light font-jost w-1/2">
            Welcome to {channelName}, you can click continue to proceed.
        </p>
    );
}

// TODO: Consider using a ref on the input to read its value
function ProtectedChannelContent() {
    return (
        <>
            <p className="text-center text-silver font-light font-jost">
                This channel is protected by a password, please enter it to
                continue.
            </p>
            <input
                type="password"
                placeholder="Password"
                className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1
                        w-[60%]
                        text-sm"
            />
        </>
    );
}

export default function WelcomeChannel({
    channelName,
    channelVisibility,
    setWelcomeChannel,
    setJoinChannel,
}: WelcomeChannelProps) {
    return (
        <div>
            <div className="flex flex-row items-center mb-8">
                <button
                    onClick={() => {
                        setWelcomeChannel(false);
                        setJoinChannel(true);
                    }}
                >
                    <BsArrowLeftShort className="text-secondary-200 text-center text-4xl" />
                </button>
                <h1 className="text-center text-2xl font-jost inline-block w-full">
                    <span className="text-secondary-200">Join</span>
                    &nbsp;
                    <span className="text-silver">#{channelName}</span>
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {channelVisibility === 'public' && (
                    <PublicChannelContent channelName={channelName} />
                )}
                {channelVisibility === 'protected' && (
                    <ProtectedChannelContent />
                )}
                <button
                    className="bg-secondary-200
                            text-background
                            font-bold
                            block w-40 py-1
                            rounded-2xl mx-auto mt-8"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
