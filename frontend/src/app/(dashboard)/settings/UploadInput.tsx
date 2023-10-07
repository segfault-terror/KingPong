import React from 'react';

export default function UploadInput({
    setImage,
    defaultImage,
}: {
    setImage: (image: string) => void;
    defaultImage: string;
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = React.useState(false);

    return (
        <>
            <button
                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all"
                onClick={() => inputRef.current?.click()}
            >
                Upload Avatar
            </button>
            <button
                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all
                            disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    if (!inputRef.current) return;
                    inputRef.current.value = '';
                    setFileSelected(inputRef.current?.files?.length === 1);
                    setImage(defaultImage || '');
                }}
                {...(fileSelected ? {} : { disabled: true })}
            >
                Reset Avatar
            </button>
            <input
                onChange={() => {
                    setFileSelected(inputRef.current?.files?.length === 1);
                    if (!inputRef.current) return;
                    const file = inputRef.current.files?.[0];
                    if (!file) return;
                    const fileUrl = URL.createObjectURL(file);
                    setImage(fileUrl);
                }}
                type="file"
                className="hidden"
                ref={inputRef}
                accept="image/*"
            />
        </>
    );
}
