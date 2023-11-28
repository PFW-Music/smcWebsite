import base from "./_base"
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]"

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(req, res) {
    const session = await getServerSession(req, res, options)
    const peopleAllInfo = [];
    const getUser = (users) => {
        return users.find(element =>
            element.email === session.user.email
        )
    }



    //console.log("Request here: ", req)
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }



    const users = [];

    base("Requested Users")
        .select({
            view: "Users",
            filterByFormula: `{Email}="${session.user.email}"`
        })
        .eachPage(
            function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    //console.log(record);

                    users.push({
                        id: record.id,
                        name: record.get("Name"),
                        email: record.get("Email"),
                        status: record.get("Status"),
                    });

                });

                fetchNextPage();
            },
            async function done(err) {
                if (err) {
                    console.error(err);
                    res.status(500).end();
                    return;
                }
                const user = getUser(users);
                if (!user) {
                    const fields = {
                        "Name": session.user.name,
                        "Email": session.user.email,
                        "Status": "Todo"
                    };

                    const records = await base("Requested Users").create([{ fields }]);
                    records.forEach(function (record) {
                        console.log(record.getId());
                    });
                    res.status(201).json({ "Permission": false, "Message:": "System admin is notified to add you to give you permission to create an event." });
                    return;

                } else{
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
                        console.log(user);
                        if(user){
                            res.status(200).json({"Permission": true, user});
                            return;
                            
                        }
                        res.status(200).json({ "Permission": false, "Message: ": "Looks like you already sent a request and we're working on it." });
                        return;
                    })
                    
                    //res.status(200).json({ "Permission": false, "Message: ": "Looks like you already sent a request and we're working on it." }).end();
                    
                }


            });

}



