import React from 'react';
import { Card, Text } from "@nextui-org/react";
import "../fade-styles.css";

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();

  React.useEffect(() => {
    let observer = null;

    if (domRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      });

      observer.observe(domRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (<div
    className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    ref={domRef}
  >
    {props.children}
  </div>);
}

const ContactCard = ({ type, url, email, subject, body, phone, iconSrc, title, description, ...rest }) => {
  const handleClick = () => {
    switch (type) {
      case 'website':
        window.open(url, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        break;
      case 'phone':
        window.location.href = `tel:${phone}`;
        break;
      case 'sms':
        window.location.href = `sms:${phone}`;
        break;
      default:
        break;
    }
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <FadeInSection>
      <Card
        isPressable
        isHoverable
        variant="bordered"
        css={{
          backgroundColor: '$accents7',
          width: '400px',
          height: '400px',
          padding: "15px",
        }}
        onClick={handleClick}
        {...rest}
      >
        <Card.Body>
          <div style={contentStyle}>
            <img src={iconSrc} alt={title} height={50} width={50} />
            <Text size={35}>{title}</Text>
            <Text size={20}>{description}</Text>
          </div>
        </Card.Body>
      </Card>
    </FadeInSection>
  );
};

export default ContactCard;
