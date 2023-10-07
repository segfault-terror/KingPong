import { redirect } from 'next/navigation';

export default function page() {
    // logout user
    redirect('/');
}
