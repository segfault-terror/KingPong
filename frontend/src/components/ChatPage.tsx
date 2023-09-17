import { BiMessageSquareAdd } from 'react-icons/bi';

export default function ChatPage() {
    return (
        <main className="bg-background relative h-screen w-screen">
            <div className="bg-secondary absolute left-1/4 h-screen w-px"></div>
            <div className="flex ">
                <BiMessageSquareAdd size="4.5rem" />
            </div>
        </main>
    );
}
