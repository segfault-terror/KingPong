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

export const Channels = [
    { name: 'segfault_terror', visibility: 'public' },
    { name: 'fc_mota9a3idin', visibility: 'protected' },
    { name: '1337', visibility: 'protected' },
    { name: '42', visibility: 'public' },
    { name: '01', visibility: 'protected' },
    { name: 'fc_lishbona', visibility: 'public' },
    { name: 'fc_madrid', visibility: 'protected' },
    { name: 'fc_barcelona', visibility: 'public' },
    { name: 'fc_manchester', visibility: 'protected' },
    { name: 'instagram', visibility: 'public' },
    { name: 'facebook', visibility: 'protected' },
    { name: 'twitter', visibility: 'public' },
    { name: 'snapchat', visibility: 'protected' },
    { name: 'youtube', visibility: 'public' },
];

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

export const Friends = [
    { fullname: 'Thommas Shelby', img: '/images/1.jpeg', username: 'Tommy' },
    { fullname: 'Hamza Haddani', img: '/images/2.jpeg', username: 'Archer' },
    { fullname: 'Omar Aaizab', img: '/images/4.jpeg', username: 'omarox' },
    { fullname: 'Abdellah Aghbal', img: '/images/1.jpeg', username: 'Aghbal' },
    { fullname: 'Aymane Aggoujjil', img: '/images/2.jpeg', username: 'Akashi' },
    { fullname: 'Naruto Uzumaki', img: '/images/4.jpeg', username: 'Naruto' },
    { fullname: 'Hamza Oumansour', img: '/images/1.jpeg', username: 'Wahid' },
];
