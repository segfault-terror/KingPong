'use client';

import Image from 'next/image';
import React from 'react';

function UploadInput() {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = React.useState(false);

    return (
        <>
            <button className="" onClick={() => inputRef.current?.click()}>
                open
            </button>
            {fileSelected && (
                <button
                    onClick={() => {
                        if (!inputRef.current) return;
                        inputRef.current.value = '';
                        setFileSelected(inputRef.current?.files?.length === 1);
                    }}
                >
                    {inputRef.current?.files?.[0].name}
                </button>
            )}
            <input
                onChange={() => {
                    setFileSelected(inputRef.current?.files?.length === 1);
                }}
                type="file"
                className="hidden"
                ref={inputRef}
            />
        </>
    );
}

export default function Settings() {
    const profile = {
        fullname: 'John Doe',
        usernamr: 'johndoe',
        avatar: '/images/4.jpeg',
    };
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
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src={profile.avatar}
                            alt="avatar"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-full border border-secondary-200"
                        />
                        <UploadInput />
                    </div>
                    <div></div>
                </div>
            </div>
        </main>
    );
}
