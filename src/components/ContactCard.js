import React from "react";
import Image from "next/image";
import { Text } from "@nextui-org/react";

const ContactCard = ({
	type,
	url,
	email,
	subject,
	body,
	phone,
	iconSrc,
	title,
	description,
}) => {
	const handleClick = () => {
		switch (type) {
			case "website":
				window.open(url, "_blank");
				break;
			case "email":
				window.location.href = `mailto:${email}?subject=${encodeURIComponent(
					subject
				)}&body=${encodeURIComponent(body)}`;
				break;
			case "phone":
				window.location.href = `tel:${phone}`;
				break;
			case "sms":
				window.location.href = `sms:${phone}`;
				break;
			default:
				break;
		}
	};

	return (
		<div className="bg-neutral-900 text-white flex items-center justify-center p-6">
			<div
				onClick={handleClick}
				className="border border-gray-300 p-6 w-80 h-80 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-all duration-200"
			>
				<Image src={iconSrc} alt={title} height={55} width={55} />
				<Text className="text-2xl">{title}</Text>
				<Text className="text-xl">{description}</Text>
			</div>
		</div>
	);
};

export default ContactCard;
