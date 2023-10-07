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
    const [fullname, setFullname] = React.useState(profile.fullname);
    const [username, setUsername] = React.useState(profile.usernamr);
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    return (
        <main className="flex items-center justify-center my-9">
            <div
                className="bg-background border border-secondary-200 rounded-3xl lg:max-w-5xl w-full mx-2
                            flex flex-col items-center justify-center gap-8 p-3"
            >
                <h2 className="font-jost text-4xl font-bold text-secondary-200">
                    Settings
                </h2>
                <div className="grid w-full gap-6 lg:grid-cols-2">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <UploadAvatar />
                    </div>
                    <form className="lg:px-12 flex flex-col gap-6">
                        <input
                            name="fullname"
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Fullname"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Current Password"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            name="newPassword"
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full bg-background border border-secondary-200 rounded-3xl
                                        px-8 py-2 font-mulish text-lg outline-none"
                        />
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all"
                            >
                                Enable 2FA
                            </button>
                            <button
                                type="submit"
                                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
