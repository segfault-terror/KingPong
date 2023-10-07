'use client';

import Image from 'next/image';
import React from 'react';

const profile = {
    fullname: 'John Doe',
    usernamr: 'johndoe',
    avatar: '/images/4.jpeg',
};

function UploadInput({ setImage }: { setImage: (image: string) => void }) {
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
            {fileSelected && (
                <button
                    onClick={() => {
                        if (!inputRef.current) return;
                        inputRef.current.value = '';
                        setFileSelected(inputRef.current?.files?.length === 1);
                        setImage(profile.avatar);
                    }}
                >
                    {inputRef.current?.files?.[0].name}
                </button>
            )}
            <input
                onChange={() => {
                    setFileSelected(inputRef.current?.files?.length === 1);
                    if (!inputRef.current) return;
                    const file = inputRef.current.files?.[0];
                    if (!file) return;
                    const fileUrl = URL.createObjectURL(file);
                    setImage(fileUrl);
                    console.log(fileUrl);
                }}
                type="file"
                className="hidden"
                ref={inputRef}
                accept="image/*"
            />
        </>
    );
}

export default function Settings() {
    const [image, setImage] = React.useState(profile.avatar);
    return (
        <main className="flex items-center justify-center my-9">
            <div
                className="bg-background border border-secondary-200 rounded-3xl lg:max-w-5xl w-full mx-2
                            flex flex-col items-center justify-center gap-8 p-3"
            >
                <h2 className="font-jost text-4xl font-bold text-secondary-200">
                    Settings
                </h2>
                <div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Image
                            src={image}
                            alt="avatar"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-full border border-secondary-200"
                        />
                        <UploadInput setImage={setImage} />
                    </div>
                    <div></div>
                </div>
            </div>
        </main>
    );
}
