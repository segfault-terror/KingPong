export enum UserStatus {
    Online = 'online',
    Offline = 'offline',
    InGame = 'in-game',
}

export type Friend = {
	id: number;
	name: string;
	avatar: string;
	status: UserStatus;
}

export type FriendState = {
	friends: Friend[];
}