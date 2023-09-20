import Link from 'next/link';

interface LINK {
    root?: string;
    className?: string;
    str?: string;
}

export default function ButtonPlay(child: LINK): JSX.Element {
    return (
        <Link href={`${child.root}`} className={`flex ${child.className}`}>
            {child.str}
        </Link>
    );
}
