import FriendsList  from "./FriendsList";
import {FriendState} from "./types";

const friendsList :FriendState[] = [
	{
		id: 1,
		name: "Tommy",
		avatar: "https://robohash.org/1?set=set2",
		status: "online",
	},
	{
		id: 2,
		name: "Archer",
		avatar: "https://robohash.org/2?set=set2",
		status: "offline",
	},
	{
		id: 3,
		name: "omarox",
		avatar: "https://robohash.org/3?set=set2",
		status: "in-game",
	},
];

export default function Page(){
	return <FriendsList friends={friendsList} />
}