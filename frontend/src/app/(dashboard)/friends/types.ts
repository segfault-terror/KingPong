export enum UserStatus {
    Online = 'ONLINE',
    Offline = 'OFFLINE',
    InGame = 'INGAME',
}

export type Friend = {
    id: number;
    username: string;
    fullname: string;
    avatar: string;
    status: UserStatus;
};

export type FriendState = {
    friends: Friend[];
};
