import { useRouter } from 'next/router';
import Link from 'next/link';
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';

export default function Header() {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const toggleMenu = () => {
		open ? setOpen(false) : setOpen(true);
		console.log(open);
	}

	useEffect(() => {
		setOpen(false);
	}, [router]);

	return (
		<div className="flex flex-col">
			<header className="flex w-full items-center justify-between bg-gray-700 text-white px-12 2xl:px-96 py-4">
				<div className="lg:hidden w-8"></div>
				<div className="text-2xl font-semibold justify-self-center">Your Leadership</div>
				<nav className="h-8">
					<button type="button" onClick={toggleMenu} className="lg:hidden">
						{
							open ? (
								<X size={32} />
							) : (
								<List size={32} />
							)
						}
					</button>
					<ul className="space-x-4 hidden lg:flex">
						<li>
							<Link href="/" className={"text-xl font-semibold hover:text-sky-300 " + (router.route == "/" ? "underline underline-offset-4" : "")}>Home</Link>
						</li>
						<li>
							<Link href="/about" className={"text-xl font-semibold hover:text-sky-300 " + (router.route == "/about" ? "underline underline-offset-4" : "")}>About</Link>
						</li>
						{/* <li> */}
							{/* buy a coffee link */}
							{/* <Link href="/contact"></Link> */}
						{/* </li> */}
					</ul>
				</nav>
				{/* <div></div> */}
			</header>
			{
				open ? (
					<ul className="flex flex-col justify-center bg-gray-700">
						<li className="py-2 text-center border-t border-gray-200">
							<Link href="/" className={"text-xl font-semibold text-gray-200 hover:text-sky-300 " + (router.route == "/" ? "" : "")}>Home</Link>
						</li>
						<li className="py-2 text-center border-t border-gray-200">
							<Link href="/about" className={"text-xl font-semibold text-gray-200 hover:text-sky-300 " + (router.route == "/about" ? "" : "")}>About</Link>
						</li>
						{/* <li className="py-2"> */}
							{/* buy a coffee link */}
							{/* <Link href="/contact"></Link> */}
						{/* </li> */}
					</ul>
				) : (
					<></>
				)
			}
		</div>
	)
}
