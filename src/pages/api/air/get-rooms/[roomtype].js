import base from "../_base"
export const config = {
    api: {
      externalResolver: true,
    },
  }

  export default function handler(req,res) {
	const roomList = [];
	const { roomtype } = req.query
	let viewName = "";
	if (roomtype === "studio"){
		viewName = "Bookable Rooms 🔒 (Studio Booking Form)";
	} else if(roomtype === "rehearsal"){
		viewName = "Bookable Rooms 🔒 (Rehearsal Booking Form)";
	}
	base("Rooms")
		.select({
			view: viewName,
		})
		.eachPage(
			function page(records, fetchNextPage) {
				records.forEach(function (record) {
					roomList.push({
						key: record.id,
						name: record.get("Name"),
						events: record.get("Events"),
					});
				});

				fetchNextPage();
			},
			function done(err) {
				res.status(200).json(roomList)
				if (err) {
					console.error(err);
				}
			}
		);
}

