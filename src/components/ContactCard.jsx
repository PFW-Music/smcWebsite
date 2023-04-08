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

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const Center = {
    background: "#16181A",
    color: "white",
    padding: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={Center}>
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
          <div style={contentStyle}>
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
