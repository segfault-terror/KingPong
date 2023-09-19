import { BiMessageAdd } from 'react-icons/bi';

export default function EmptyChat() {
    return (
        <div
            className="grid justify-center align-center
                        text-center text-cube_palette-200"
        >
            <BiMessageAdd className="w-20 h-20 mx-auto" />
            <h1 className="text-2xl">Your messages</h1>
            <p className="text-xs font-light mb-3">
                Send private messages to a friend or channel
            </p>
            <button
                onClick={() => console.log('Send a message')}
                className="text-primary bg-secondary-200
                            text-xs font-bold font-jost
                            rounded-xl
                            py-2
                            inline-block w-32
                            mx-auto"
            >
                Send a message
            </button>
        </div>
    );
}
