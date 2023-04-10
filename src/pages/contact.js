"use client";
import React from "react";
import HeaderWithSubtitle from "../components/HeaderWithSubtitle";
import ContactCard from "../components/ContactCard";

export default function Contact() {
	return (
		<div className="bg-neutral-900 min-h-screen">
			<HeaderWithSubtitle
				title="Contact Us"
				subtitle="See below for information on getting in contact with John Buteyn..."
			/>
			<HeaderWithSubtitle title="For Non Urgent Matters:" />
			<div>
				<ContactCard
					type="website"
					url="https://calendly.com/johnmbuteyn"
					iconSrc="https://img.icons8.com/color/48/000000/calendar--v3.png"
					title="Schedule Time"
					description="Meet in person or over the web"
				/>
				<ContactCard
					type="website"
					url="https://pfwpopularmusic.slack.com/archives/D0189HCR6AF"
					iconSrc="https://img.icons8.com/color/48/000000/slack-new.png"
					title="DM in Slack"
					description="Typically responds within 12 hours"
				/>
				<ContactCard
					type="email"
					email="mailto:jbuteyn@pfw.edu"
					subject="Meeting Request"
					body="Hello, I would like to schedule a meeting."
					iconSrc="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/000000/external-email-social-media-basic-1-sbts2018-flat-sbts2018.png"
					title="Send an email"
					description="Typically responds within 24 hours"
				/>
			</div>

			<HeaderWithSubtitle title="For Urgent Matters:" />
			<div>
				<ContactCard
					type="phone"
					phone="+17315405539"
					iconSrc="https://img.icons8.com/nolan/58/phone.png"
					title="(731) 540-5539"
					description="I'll call back if I'm unavailable"
				/>
				<ContactCard
					type="website"
					url="https://studentopportunity.slack.com/archives/D018UKRHMB2"
					iconSrc="https://img.icons8.com/color/48/000000/slack-new.png"
					title="Emergency DM in Slack"
					description="Typically responds within 6 hours"
				/>
				<ContactCard
					type="sms"
					phone="+17315405539"
					iconSrc="https://img.icons8.com/color/58/000000/messaging-.png"
					title="Send SMS"
					description="Click to send an SMS"
				/>
			</div>
		</div>
	);
}
