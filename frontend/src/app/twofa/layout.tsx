import Logo from "@/components/Logo";
import Page from "./page";
import Link from "next/link";

export default function layout() {
	return (
		<div className="w-screen h-screen m-auto flex flex-col justify-center items-center backdrop-blur-sm relative">
			<Link href={'/'}>
			<Logo  mylogo={"/images/logo.svg"} className="absolute top-0 left-0 w-[30%]" />
			</Link>
			
			<Page />
		</div>
	)
}