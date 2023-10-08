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

export const Channels = ['segfault_terror', 'fc_mota9a3idin'];

export const ChannelConversations = {
    segfault_terror: {
        channelName: 'segfault_terror',
        members: [
            {
                name: 'Tommy',
                img: '/images/1.jpeg',
            },
            {
                name: 'Archer',
                img: '/images/2.jpeg',
            },
            {
                name: 'omarox',
                img: '/images/4.jpeg',
            },
        ],
        messages: [
            {
                text: "Hey, what's up",
                isMe: false,
                sender: {
                    name: 'Tommy',
                    img: '/images/1.jpeg',
                },
            },
            {
                text: "I'm fine, how about you?",
                isMe: true,
                sender: {
                    name: 'Archer',
                    img: '/images/2.jpeg',
                },
            },
            {
                text: 'Wa fin a drari',
                isMe: false,
                sender: {
                    name: 'omarox',
                    img: '/images/4.jpeg',
                },
            },
        ],
    },
    fc_mota9a3idin: {
        channelName: 'fc_mota9a3idin',
        members: [
            {
                name: 'Tommy',
                img: '/images/1.jpeg',
            },
            {
                name: 'Archer',
                img: '/images/2.jpeg',
            },
            {
                name: 'omarox',
                img: '/images/4.jpeg',
            },
        ],
        messages: [
            {
                text: 'chi match a drari?',
                isMe: false,
                sender: {
                    name: 'Tommy',
                    img: '/images/1.jpeg',
                },
            },
            {
                text: 'ana mala3ebch',
                isMe: true,
                sender: {
                    name: 'Archer',
                    img: '/images/2.jpeg',
                },
            },
            {
                text: 'chkon la3eb b3da?',
                isMe: false,
                sender: {
                    name: 'omarox',
                    img: '/images/4.jpeg',
                },
            },
        ],
    },
};
