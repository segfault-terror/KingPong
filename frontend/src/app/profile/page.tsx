import Logo from '../../components/Logo';
import { AiOutlineBell } from 'react-icons/ai';
import UserCircleInfo from './UserCircleInfo';

export default function ProfilePage() {
    return (
        <>
            <div className="p-4 flex justify-between items-center">
                <Logo mylogo="/images/logo.svg" className="w-1/2" />
                <AiOutlineBell className="text-secondary-200 text-3xl" />
            </div>
            <UserCircleInfo />
        </>
    );
}
