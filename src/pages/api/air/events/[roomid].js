import base from "../_base"
export const config = {
    api: {
      externalResolver: true,
    },
  }

  export default function handler(req,res) {
	
	const { roomid } = req.query
    const eventsList = []

    base("Rooms").find(roomid, function (err, record) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        eventsList.push({
            name: record.get("Name"),
            id: record.id,
            eventStart: record.get("Events Start"),
            eventEnd: record.get("Events End"),
            eventStatus: record.get("Events Status"),
        });
        res.status(200).json(eventsList);
        return;
    });
	
	
}

