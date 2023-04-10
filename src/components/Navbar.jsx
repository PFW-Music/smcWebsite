"use client";
import Link from "next/link";
import Image from "next/image";

const NavbarCustom = () => {
	return (
		<div className="flex justify-center items-center bg-gray-900 w-full flex-col p-4">
			<Image src={"/LogoPFW.webp"} width={300} height={50} alt={"Logo"}></Image>
			<ul className="list-none m-0 p-4 flex justify-center">
				<li className="mr-4">
					<Link href="/">
						<span className="text-white hover:text-gray-300 cursor-pointer inline-block">
							Home
						</span>
					</Link>
				</li>
				<li className="mr-4">
					<Link href="/schedule">
						<span className="text-white hover:text-gray-300 cursor-pointer inline-block">
							Schedules
						</span>
					</Link>
				</li>
				<li className="mr-4">
					<Link href="/gear">
						<span className="text-white hover:text-gray-300 cursor-pointer inline-block">
							Gear
						</span>
					</Link>
				</li>
				<li className="mr-4">
					<Link href="/contact">
						<span className="text-white hover:text-gray-300 cursor-pointer inline-block">
							Contact Us
						</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavbarCustom;
