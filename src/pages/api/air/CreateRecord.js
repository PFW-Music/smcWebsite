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
    const getUser = (users)=>{
      return users.find(element =>
        element.email === session.user.email
      )
    }

    
    

    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }


    base("SMC People")
    .select({
      view: "ALL PEOPLE",
      filterByFormula:`{Email}="${session.user.email}"`
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          //console.log(record);
         
          peopleAllInfo.push({
            id: record.id,
            name: record.get("Person"),
            email: record.get("Email"),
            roomAccess: record.get("Room Access"),
            gearAccess: record.get("Gear Access"),
            phoneNum: record.get("Phone"),
          });
  
        });
  
        fetchNextPage();
      },
      async function done(err) {
        if(err){
          console.error(err);
          res.status(500).end();
          return;
        }
        //console.log(peopleAllInfo)
        const user = getUser(peopleAllInfo);
        console.log("User: ", user);
        if(!user){
          const fields = {
            "Name": session.user.name,
            "Email": session.user.email,
            "Status": "Todo"
          };
      
          const records = await base("Requested Users").create([{ fields }]);
          records.forEach(function (record) {
            console.log(record.getId());
          });
          res.status(401).end();
          return;
        }
        //console.log("USER: ", user);

        if (req.method === 'POST') {
          const fields = req.body;
          fields.Students.push(user.id);
          console.log(fields)
          
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
    );

}