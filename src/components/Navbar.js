import Link from "next/link";
import Image from "next/image";

const NavbarCustom = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-neutral-900 w-full ">
			<Image
				className="py-4"
				src={"/LogoPFW.webp"}
				width={300}
				height={50}
				alt={"Logo"}
				fit="contain"
			></Image>
			<ul className="flex list-none m-0">
				<li className="mr-8">
					<Link href="/" className="text-blue-500">
						Home
					</Link>
				</li>
				<li className="mr-8">
					<Link href="/schedule" className="text-blue-500">
						Schedules
					</Link>
				</li>
				<li className="mr-8">
					<Link href="/gear" className="text-blue-500">
						Gear
					</Link>
				</li>
				<li className="mr-8">
					<Link href="/contact" className="text-blue-500">
						Contact Us
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavbarCustom;
