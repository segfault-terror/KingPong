import Notification from '@/components/Notifications';

const NotificationState = {
    notification: [
        {
            id: 1,
            type: 'Game' as const,
            readed: false,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/10',
            },
        },
        {
            id: 2,
            type: 'friend' as const,
            readed: false,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/30',
            },
        },
        {
            id: 3,
            type: 'Game' as const,
            readed: false,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/20',
            },
        },
        {
            id: 4,
            type: 'friend' as const,
            readed: true,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/40',
            },
        },
        {
            id: 5,
            type: 'Game' as const,
            readed: true,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/50',
            },
        },
        {
            id: 6,
            type: 'friend' as const,
            readed: false,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/60',
            },
        },
        {
            id: 7,
            type: 'Game' as const,
            readed: true,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/70',
            },
        },
        {
            id: 8,
            type: 'friend' as const,
            readed: true,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/80',
            },
        },
        {
            id: 9,
            type: 'Game' as const,
            readed: true,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/90',
            },
        },
        {
            id: 10,
            type: 'friend' as const,
            readed: true,
            sender: {
                name: 'John Doe',
                image: 'https://robohash.org/100',
            },
        }
    ],
  };

  const Empty = []


export default function Page(){
	return <Notification notification={NotificationState.notification} />
}