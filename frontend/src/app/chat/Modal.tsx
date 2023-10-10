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
            <div
                className="absolute inset-0 bg-black/60 z-10"
                onClick={onClose}
            />
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${childrenClassName}`}
            >
                {children}
            </div>
        </>,
        document.body,
    );
}
