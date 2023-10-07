'use client';

import Image from 'next/image';
import React from 'react';
import UploadInput from './UploadInput';

const profile = {
    fullname: 'John Doe',
    usernamr: 'johndoe',
    avatar: '/images/4.jpeg',
};

function UploadAvatar() {
    const [image, setImage] = React.useState(profile.avatar);

    return (
        <>
            <Image
                src={image}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-full border border-secondary-200"
            />
            <UploadInput setImage={setImage} defaultImage={profile.avatar} />
        </>
    );
}

export default function Settings() {
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
                        <UploadAvatar />
                    </div>
                    <div></div>
                </div>
            </div>
        </main>
    );
}
