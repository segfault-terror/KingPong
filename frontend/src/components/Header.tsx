import { MdChatBubbleOutline, MdSearch } from 'react-icons/md';
import ButtonImage from './ButtonImage';
import LinkIcon from './LinkIcon';

export default function Header() {
    return (
        <header className="fixed p-3">
            <div className="flex items-center justify-between">
                <img
                    src="/images/logo.svg"
                    className="w-56 md:w-56"
                    alt="logo"
                />
                <LinkIcon href="#">
                    <MdSearch />
                </LinkIcon>
                <nav className="flex">
                    <ul className="flex gap-2">
                        <li>
                            <LinkIcon href="#">
                                <MdChatBubbleOutline />
                            </LinkIcon>
                        </li>
                    </ul>
                    <ButtonImage>
                        <img src="/images/4.jpeg" alt="avatar" />
                    </ButtonImage>
                </nav>
            </div>
        </header>
    );
}
