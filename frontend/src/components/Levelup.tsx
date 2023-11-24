'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LevelUpProps {
    newLevel: string;
    data: any;
}

const levelStars = (newLevel: string) => {
    return (
        <div className="">
            <div className="absolute inset-0 flex flex-col justify-center items-center animate-[zoomin_1.5s_ease-in] overflow-hidden">
                <img src="/images/Tree-stars.svg" alt="stars" />
                <p className="text-6xl text-black font-nicomoji absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {newLevel}
                </p>
                <img
                    src="/images/Ellipse-levelUp.svg"
                    alt="Ellipse"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in opacity-0"
                    style={{
                        animationDelay: '2s',
                        animationDuration: '1s',
                    }}
                />
            </div>
        </div>
    );
};

export default function LevelUp({ newLevel, data }: LevelUpProps) {
    const { mutate: updateUser } = useMutation(async () => {
        return await axios.post(`/api/user/setdata`, {
            withCredentials: true,
        });
    });
    //counter 10s
    const [counter, setCounter] = useState(10);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (counter === 0) {
            updateUser();
            queryClient.invalidateQueries(['me'], {
                exact: true,
            });
        }
        const timer = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [counter, data, queryClient, updateUser]);

    return (
        <div className="min-h-screen bg-center bg-cover flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-[1px]">
            <div className="absolute inset-0 flex flex-col justify-around items-center">
                <img
                    src="/images/Level-UP.svg"
                    alt="levelup"
                    className="z-10 animate-[zoomin2_1.5s_ease-in]"
                />
                <Link
                    href={'/home'}
                    className="bg-yellow-400 text-black text-xl font-nicomoji px-8 py-2 rounded-full z-10 border-t-4 border-b-4 border-white hover:border-secondary-500 hover:drop-shadow-neon-orange hover:text-primary animate-fade-in opacity-0"
                    style={{
                        animationDelay: '3s',
                        animationDuration: '1s',
                    }}
                    onClick={() => {
                        setCounter(0);
                    }}
                >
                    continue
                </Link>
                <div className=" text-center flex justify-center items-center text-lg md:text-2xl lg:text-4xl font-nicomoji text-orange-400 absolute top-5 lg:top-10">
                    You have {counter} seconds to continue
                </div>
            </div>
            {levelStars(newLevel)}
        </div>
    );
}
