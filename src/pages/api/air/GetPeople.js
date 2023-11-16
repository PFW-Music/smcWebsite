import base from "./_base"
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]"
export const config = {
    api: {
      externalResolver: true,
    },
  }
export default async function handler(req, res){
    const session = await getServerSession(req, res, options)
    const peopleAllInfo = [];
    const SMCpeople = [];
    const facultyList = [];

    if (session) {
        base("SMC People")
	.select({
		view: "ALL PEOPLE",
		filterByFormula:`{Email}="${session.user.email}"`
	})
	.eachPage(
		function page(records, fetchNextPage) {
			records.forEach(function (record) {
				//console.log(record);
				SMCpeople.push({ name: record.get("Person"), id: record.id });
				peopleAllInfo.push({
					id: record.id,
					name: record.get("Person"),
					email: record.get("Email"),
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
			peopleAllInfo.forEach((record)=>{
				if (record.email === session.user.email){				
					res.status(200).json(record);
					return;
				}
			}
			)
			res.status(200).json({});
			if (err) {
				res.status(500).end();
				console.error(err);
				return;
			}
		}
	);
      } else {
        console.log("failed!")
        res.status(401)
        res.end();
      }
}
