import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Socket, io } from 'socket.io-client';

const SocketContext = createContext({} as { socket: Socket | null });

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider(props: {
    children: ReactNode;
    username: string;
}) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('/chat', {
            withCredentials: true,
            path: '/api/socket',
            autoConnect: false,
        });

        async function connect() {
            await new Promise((resolve) => setTimeout(resolve, 0));
            newSocket.connect();
        }

        connect();
        newSocket.emit('register', props.username);

        setSocket(newSocket);
        return () => {
            setTimeout(() => newSocket.close(), 0);
        };
    }, [props.username]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );
}
