import { createPortal } from 'react-dom';

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
    childrenClassName?: string;
};

export default function Modal({
    children,
    onClose,
    childrenClassName = '',
}: ModalProps) {
    return createPortal(
        <>
            <div className="absolute h-screen inset-0 z-10" onClick={onClose} />
            <div
                className={`absolute top-56 lg:top-52 right-12 z-20 ${childrenClassName}`}
            >
                {children}
            </div>
        </>,
        document.body,
    );
}
