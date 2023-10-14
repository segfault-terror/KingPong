import Link from 'next/link';
import { Users } from '../(dashboard)/profile/data/ProfileData';
import { Channels } from './data/ChatData';

type ChannelSideBarProps = {
    channelName: string;
};

function Member({
    username,
    avatarPath,
}: {
    username: string;
    avatarPath: string;
}) {
    return (
        <Link href={`/profile/${username}`} className="flex items-center gap-2">
            <img
                src={avatarPath}
                alt={`${username}'s avatar`}
                className="border-[1px] border-secondary-200
														rounded-full object-cover
														w-10 h-10"
            />
            <p className="text-silver">{username}</p>
        </Link>
    );
}

export default function ChannelSideBar({ channelName }: ChannelSideBarProps) {
    const channel = Channels.find((channel) => channel.name === channelName);
    const owner = Users.find((user) => user.username === channel!.owner);
    const admins = Users.filter((user) =>
        channel!.admins.includes(user.username),
    );
    const members = Users.filter((user) =>
        channel!.members.includes(user.username),
    );

    return (
            <div
                className="bg-primary border-[1px] border-secondary-200 w-72 h-[80vh] mx-auto
						rounded-2xl p-8
						text-pink font-jost"
            >
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-center">Owner</h2>
                    <Member
                        username={owner!.username}
                        avatarPath={owner!.avatarPath}
                    />
                    <h2>Admins</h2>
                    {admins.map((admin) => (
                        <Member
                            key={admin.username}
                            username={admin.username}
                            avatarPath={admin.avatarPath}
                        />
                    ))}
                    <div className="self-start flex flex-col gap-4 mt-6">
                        <h2>Members</h2>
                        {members.map((member) => (
                            <Member
                                key={member.username}
                                username={member.username}
                                avatarPath={member.avatarPath}
                            />
                        ))}
                    </div>
                </div>
            </div>
    );
}
