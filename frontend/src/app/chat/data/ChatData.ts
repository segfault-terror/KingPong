import { UserStatus } from '../DirectMessage';

export { DMList, DMConversations };

const DMList = [
    {
        userName: 'Tommy',
        imagePath: '/images/1.jpeg',
        lastMessage: 'Hello',
        status: UserStatus.Online,
    },
    {
        userName: 'Archer',
        imagePath: '/images/2.jpeg',
        lastMessage: 'Hello',
        status: UserStatus.Offline,
    },
];

// userImg: string;
// userName: string;
// userStatus: UserStatus;
// messages?: Message[];

const DMConversations = {
    Tommy: {
        userName: 'Tommy',
        userImg: '/images/1.jpeg',
        userStatus: UserStatus.Online,
        messages: [
            {
                text: 'Hello',
                isMe: true,
            },
            {
                text: "Hi, what's up?",
                isMe: false,
            },
            {
                text: 'Nothing much, you?',
                isMe: true,
            },
            {
                text: 'Same here',
                isMe: false,
            },
        ],
    },
    Archer: {
        userName: 'Archer',
        userImg: '/images/2.jpeg',
        userStatus: UserStatus.Offline,
        messages: [
            {
                text: 'Hello',
                isMe: true,
            },
            {
                text: "Hi, what's up?",
                isMe: false,
            },
            {
                text: 'Nothing much, you?',
                isMe: true,
            },
            {
                text: 'Same here',
                isMe: false,
            },
        ],
    },
};
