const {MongoClient, Collection} = require('mongodb');
const url = "mongodb://localhost:27017";
const database = "login_credentials";
const client = new MongoClient(url);

let collection;
async function dbConnect()
{
    let result = await client.connect();
    let db = result.db(database);
    collection = db.collection(database);
}
async function getAllData(input)
{
    let response = await (collection.find().toArray());
    console.log(response);
}
async function getData(input)
{
    let response = await (collection.find({id: input}).toArray());
    return (response);
}
async function insertData(loginId, password)
{
    collection.insertOne({
        id: loginId,
        pwd: password
    });
}
dbConnect()
.then(()=>{
    // insertData("id", "pwd")
    getAllData()
    // getData("newdid").then((response)=>
    // {
    //     if(response[0])
    //     {
    //         let rep = response[0];
    //         if(rep.pwd == "newpwd")
    //         {
    //             console.log("success");
    //         }
    //         else
    //         {
    //             console.log("failure");
    //         }
    //     }
    //     else
    //     {
    //         console.log("User not found");
    //     }
    // });

});