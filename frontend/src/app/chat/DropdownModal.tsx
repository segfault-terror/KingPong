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
            <div className="fixed h-screen inset-0 z-30" onClick={onClose} />
            <div className={`absolute z-40 ${childrenClassName}`}>
                {children}
            </div>
        </>,
        document.body,
    );
}
