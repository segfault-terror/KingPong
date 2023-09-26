import UserCircleInfo, { UserCircleInfoProps } from './UserCircleInfo';
import { UserStatus } from '../../components/DirectMessage';

import Tommy from '../../stories/assets/1.jpeg';

type FullFriendListProps = {
	lastFriends: UserCircleInfoProps[];
};

export default function FullFriendList( {lastFriends}: FullFriendListProps ) {
	if (lastFriends.length > 3) {
		throw new Error('FullFriendList can only display 3 friends');
	}

    return (
        <>
            <div
                className="bg-primary bg-opacity-80 rounded-t-2xl
			flex justify-evenly py-4"
            >
            {lastFriends.map((friend, idx) => {
				return (
					<UserCircleInfo
						key={idx}
						{...friend}
					/>
				);
			})}
            </div>
            <div
                className="flex items-center justify-center
				text-sm text-white
				bg-gradient-to-t from-[#881EDF] to-secondary-200
				w-full h-8
				rounded-b-2xl"
            >
                Full Friend List
            </div>
        </>
    );
}
