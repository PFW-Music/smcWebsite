import React from "react";
import base from "../airtable";

async function createEventRecord(
	users,
	startTimeSelected,
	endTimeSelected,
	gears
) {
	try {
		const records = await base("Events").create([
			{
				fields: {
					"Event Name": "Individual Gear Check Out",
					"Start Time": startTimeSelected,
					"Proposed End Time": endTimeSelected,
					Students: users,
					Status: "Booked ✅",
					"Gear Selection": gears,
				},
			},
		]);

		records.forEach(function (record) {
			return record.getId();
		});
	} catch (err) {
		console.error(err);
	}
}

export default function Submit({
	userSelected,
	startTimeSelected,
	endTimeSelected,
	gearSelected,
	timeCorrect,
}) {
	const handleSubmit = async () => {
		const users = userSelected.map((obj) => obj.id);
		const gears = gearSelected.map((obj) => obj.id);

		await createEventRecord(users, startTimeSelected, endTimeSelected, gears);
		// Add any desired action after submission, e.g., show an alert or reload the page
		alert(
			"Submission Successful! Please check your inbox for booking confirmation."
		);
		window.location.reload();
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<button
				className={`${
					!(endTimeSelected && startTimeSelected && timeCorrect) ||
					gearSelected.length === 0 ||
					userSelected.length === 0
						? "bg-gray-300 cursor-not-allowed"
						: "bg-yellow-500 hover:bg-yellow-600"
				} text-white font-semibold py-2 px-4 border border-yellow-500 rounded`}
				onClick={handleSubmit}
				disabled={
					!(endTimeSelected && startTimeSelected && timeCorrect) ||
					gearSelected.length === 0 ||
					userSelected.length === 0
				}
			>
				SUBMIT
			</button>
		</div>
	);
}
