/* eslint-disable @next/next/no-img-element */

import Tommy from '../../stories/assets/1.jpeg';
import Archer from '../../stories/assets/2.jpeg';

export default function UserCircleInfo() {
    return (
        <div className="border-4 border-secondary-200 box-border rounded-full w-32 h-32 overflow-hidden">
            <img
                src={Archer.src}
                alt="User Avatar"
                className="rounded-full object-cover w-32 h-32"
            />
            <div
                className="text-primary bg-secondary-200
                            text-center text-lg font-bold
                            h-[30%]
                            relative bottom-[30%] rounded-b-full"
            >
                50
            </div>
        </div>
    );
}
