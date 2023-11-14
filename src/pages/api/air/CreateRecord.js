import base from "./_base"
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]"
export const config = {
    api: {
      externalResolver: true,
    },
  }

export default async function handler(req, res){

    if (req.method === 'POST') {
        const fields = req.body;
        try {
            const records = await base("Events").create([{ fields }]);
    
            records.forEach(function (record) {
                console.log(record.getId());
            });
        } catch (err) {
            res.status(500).end();
            console.error(err);
        }

        res.status(201).end();

            
    }


}