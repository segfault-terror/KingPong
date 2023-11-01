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

export function SocketProvider(props: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('/chat', {
            withCredentials: true,
            path: '/api/socket',
        });

        setSocket(newSocket);
        return () => {
            setTimeout(() => newSocket.close(), 0);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );
}
