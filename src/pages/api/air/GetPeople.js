import base from "./_base"
export const config = {
    api: {
      externalResolver: true,
    },
  }
export default async function handler(req, res){
    const peopleAllInfo = [];
    const SMCpeople = [];
    const facultyList = [];
    base("SMC People")
	.select({
		view: "ALL PEOPLE",
	})
	.eachPage(
		function page(records, fetchNextPage) {
			records.forEach(function (record) {
				//console.log(record);
				SMCpeople.push({ name: record.get("Person"), id: record.id });
				peopleAllInfo.push({
					id: record.id,
					name: record.get("Person"),
					roomAccess: record.get("Room Access"),
					gearAccess: record.get("Gear Access"),
					phoneNum: record.get("Phone"),
				});

				if (record.get("Role").includes("Faculty/Staff 🎓")) {
					facultyList.push({ name: record.get("Person"), id: record.id });
				}
			});

			fetchNextPage();
		},
		function done(err) {
			res.status(200).json({peopleAllInfo:peopleAllInfo, facultyList: facultyList});
			if (err) {
				console.error(err);
			}
		}
	);
}