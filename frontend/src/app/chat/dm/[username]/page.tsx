import DmConversation from '../../DmConversation';

type UsernameDMProps = {
    params: {
        username: string;
    };
};

export default function UsernameDM({ params }: UsernameDMProps) {
    return <DmConversation userName={params.username} />;
}
