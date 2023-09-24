import Logo from '../../components/Logo';
import { AiOutlineBell } from 'react-icons/ai';
import UserCircleInfo from './UserCircleInfo';

import Archer from '../../stories/assets/2.jpeg';
import { UserStatus } from '@/components/DirectMessage';

export default function ProfilePage() {
    return (
        <>
            <div className="p-4 flex justify-between items-center">
                <Logo mylogo="/images/logo.svg" className="w-1/2" />
                <AiOutlineBell className="text-secondary-200 text-3xl" />
            </div>
            <UserCircleInfo avatarPath={Archer.src} level={100} status={UserStatus.Online} />
        </>
    );
}
