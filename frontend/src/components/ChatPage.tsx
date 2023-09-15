import { BiMessageSquareAdd } from "react-icons/bi";

export default function ChatPage() {
    return (
        <main className="bg-background h-screen w-screen relative">
            <div className="absolute left-1/4 w-px h-screen bg-secondary"></div>
            <div className="flex ">
                <BiMessageSquareAdd size='4.5rem'/>
            </div>
        </main>
    );
}