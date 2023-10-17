import FriendsList from "./FriendsList";
import { Friend, UserStatus } from "./types";

const friendsList: Friend[] = [
	{
		id: 1,
		name: "Tommy",
		avatar: "https://robohash.org/1?set=set2",
		status: "online" as UserStatus,
	},
	{
		id: 2,
		name: "Archer",
		avatar: "https://robohash.org/2?set=set2",
		status: "offline" as UserStatus,
	},
	{
		id: 3,
		name: "omarox",
		avatar: "https://robohash.org/3?set=set2",
		status: "in-game" as UserStatus,
	},
	{
		id: 4,
		name: "John",
		avatar: "https://robohash.org/4?set=set2",
		status: "online" as UserStatus,
	},
	{
		id: 5,
		name: "Sarah",
		avatar: "https://robohash.org/5?set=set2",
		status: "offline" as UserStatus,
	},
	{
		id: 6,
		name: "Mike",
		avatar: "https://robohash.org/6?set=set2",
		status: "in-game" as UserStatus,
	},
	{
		id: 7,
		name: "Emily",
		avatar: "https://robohash.org/7?set=set2",
		status: "online" as UserStatus,
	},
	{
		id: 8,
		name: "David",
		avatar: "https://robohash.org/8?set=set2",
		status: "offline" as UserStatus,
	},
	{
		id: 9,
		name: "Linda",
		avatar: "https://robohash.org/9?set=set2",
		status: "in-game" as UserStatus,
	},
	{
		id: 10,
		name: "Alex",
		avatar: "https://robohash.org/10?set=set2",
		status: "online" as UserStatus,
	},
	{
		id: 11,
		name: "Sophie",
		avatar: "https://robohash.org/11?set=set2",
		status: "offline" as UserStatus,
	},
	{
		id: 12,
		name: "Jack",
		avatar: "https://robohash.org/12?set=set2",
		status: "in-game" as UserStatus,
	},
	{
		id: 13,
		name: "Olivia",
		avatar: "https://robohash.org/13?set=set2",
		status: "online" as UserStatus,
	},
	{
		id: 14,
		name: "Daniel",
		avatar: "https://robohash.org/14?set=set2",
		status: "offline" as UserStatus,
	},
];

export default function FriendsPage(){
	return <FriendsList friends={friendsList} />
}