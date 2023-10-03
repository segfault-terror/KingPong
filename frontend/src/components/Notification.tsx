import Link from "next/link";

interface NotificationProps {
	message: Function;
	type: "success" | "error";
	sender: string;
}


export default function Notification(props: NotificationProps) {
	return (
		<div className="min-w-min lg:w-1/4 h-24 lg:h-44 bg-gray-300 border-b-2 rounded-b-xl lg:rounded-se-xl grid grid-cols-4 grid-rows-2">
				<div className="col-span-1 row-span-2 flex justify-center items-center">
					<img src="https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg" alt="sender" className="w-full rounded-full border-2 border-white" />
				</div>
				<div className="col-span-3 row-span-1 flex justify-center items-center text-sm">{props.message()}</div>
				<div className="col-span-3 row-span-1 flex justify-around items-center  text-center align-middle text-black font-jost">
					<div className="w-2/5 h-2/4 bg-green-600 rounded-lg">Accept</div>
					<div className="w-2/5 h-2/4 bg-red-600 rounded-lg">Decline</div>
				</div>

		</div>
	);
}