import { UserStatus } from '@/app/chat/DirectMessage';

export enum League {
    Bronze = 'Bronze',
    Silver = 'Silver',
    Gold = 'Gold',
}

export const Users = [
    {
        username: 'Tommy',
        fullname: 'Thomas Shelby',
        avatarPath: '/images/1.jpeg',
        status: UserStatus.Online,
    },
    {
        username: 'Archer',
        fullname: 'Hamza Haddani',
        avatarPath: '/images/2.jpeg',
        status: UserStatus.Offline,
    },
    {
        username: 'omarox',
        fullname: 'Omar Aizab',
        avatarPath: '/images/4.jpeg',
        status: UserStatus.InGame,
    },
];

export const UsersStats = [
    {
        level: 21,
        league: League.Bronze,
        wins: 41,
        losses: 22,
        username: 'Tommy',
    },
    {
        level: 10,
        league: League.Silver,
        wins: 10,
        losses: 0,
        username: 'Archer',
    },
    {
        level: 55,
        league: League.Gold,
        wins: 66,
        losses: 102,
        username: 'omarox',
    },
];

export const UsersAchievements = [
    {
        title: 'First Win',
        description: 'Win your first game',
        image: '/images/bronze-achievement.svg',
        username: 'Tommy',
    },
    {
        title: 'First Win',
        description: 'Win your first game',
        image: '/images/bronze-achievement.svg',
        username: 'Archer',
    },
    {
        title: 'First Win',
        description: 'Win your first game',
        image: '/images/bronze-achievement.svg',
        username: 'omarox',
    },
    {
        title: '50 Wins',
        description: 'Win 50 games',
        image: '/images/silver-achievement.svg',
        username: 'Tommy',
    },
    {
        title: '50 Wins',
        description: 'Win 50 games',
        image: '/images/silver-achievement.svg',
        username: 'omarox',
    },
    {
        title: '100 Wins',
        description: 'Win 100 games',
        image: '/images/gold-achievement.svg',
        username: 'omarox',
    },
    {
        title: '100 Wins',
        description: 'Win 100 games',
        image: '/images/gold-achievement.svg',
        username: 'Archer',
    },
];

export const UsersFriends = [
    {
        friendList: [],
        username: 'Tommy',
    },
    {
        friendList: ['Tommy', 'omarox'],
        username: 'Archer',
    },
    {
        friendList: ['Tommy', 'Archer'],
        username: 'omarox',
    },
];

export const UsersMatchHistory = [
    {
        opponentUsername: 'Tommy',
        opponentScore: 11,
        playerScore: 9,
        username: 'Archer',
    },
    {
        opponentUsername: 'omarox',
        opponentScore: 6,
        playerScore: 11,
        username: 'Archer',
    },
    {
        opponentUsername: 'omarox',
        opponentScore: 9,
        playerScore: 11,
        username: 'Archer',
    },
    {
        opponentUsername: 'Tommy',
        opponentScore: 11,
        playerScore: 9,
        username: 'omarox',
    },
    {
        opponentUsername: 'Archer',
        opponentScore: 6,
        playerScore: 11,
        username: 'omarox',
    },
];
