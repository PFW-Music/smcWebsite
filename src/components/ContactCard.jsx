import React from "react";
import Image from "next/image";
import { Card, Text } from "@nextui-org/react";

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
	...rest
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
			<Card
				isPressable
				isHoverable
				variant="bordered"
				css={{
					backgroundColor: "$accents7",
					width: "350px",
					height: "350px",
					padding: "15px",
				}}
				onClick={handleClick}
				{...rest}
			>
				<Card.Body>
					<div className="flex flex-col items-center justify-center">
						<Image src={iconSrc} alt={title} height={55} width={55} />
						<Text size={30}>{title}</Text>
						<Text size={20}>{description}</Text>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ContactCard;
