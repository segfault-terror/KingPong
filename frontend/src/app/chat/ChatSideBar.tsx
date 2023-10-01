import DirectMessage, { UserStatus } from './DirectMessage';
import ToggleButton from './ToggleButton';
import { DirectMessageProps } from './DirectMessage';

type ChatSideBarProps = {
    messagesList: DirectMessageProps[];
};

export default function ChatSideBar({ messagesList }: ChatSideBarProps) {
    return (
        <div className="flex items-center justify-center mt-[50%]">
            <div
                className="bg-primary bg-opacity-80
						w-full h-full rounded-2xl p-4
						flex flex-col justify-between"
            >
                <ToggleButton />
                <div
                    className={`flex flex-col justify-start flex-grow
							px-4 mt-8 overflow-auto`}
                >
                    {messagesList.map((message, idx) => {
                        return (
                            <>
                                <DirectMessage key={idx} {...message} />
                                {idx < messagesList.length - 1 && (
                                    <div className="mt-4"></div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
