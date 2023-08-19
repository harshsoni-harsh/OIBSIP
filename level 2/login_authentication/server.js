const express = require('express');
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000

const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017"
const database = "login_credentials"
const client = new MongoClient(url);

const bcrypt = require('bcrypt');

app.use(bodyParser.json());

let collection;
async function dbConnect()
{
    let result = await client.connect();
    let db = result.db(database);
    collection = db.collection(database);
}
async function getData(input)
{
    let response = await (collection.find({id: input}).toArray());
    return response;
}
async function insertData(loginId, password)
{
    let hash = await bcrypt.hash(password, 10);
    collection.insertOne({
        id: loginId,
        pwd: hash
    });
}

app.get('/', (req, res) => {
  res.sendFile("/index.html", { root: __dirname });
})

app.get('/style.css', (req, res) => {
    res.sendFile("/style.css", { root: __dirname });
})

app.get('/script.js', (req, res) => {
    res.sendFile("/script.js", { root: __dirname });
})

let connect = dbConnect();
app.post('/api/authenticate', (req, res) => {
    const {username, password} = req.body;
    // Check in database
    connect.then(() => 
    {
        getData(username).then((response)=>
        {
            if(response[0])
            {
                let rep = response[0];
                if( bcrypt.compare(password, rep.pwd) )
                {
                    res.status(200).json({request: "Success"});
                }
                else
                {
                    res.status(200).json({request: "incorrect"});
                }
            }
            else
            {
                res.status(200).json({request: "User doesn't exists"});
            };
        });
    });

})
app.post('/api/create', (req, res) => {
    const {username, password} = req.body;
    // Check in database
    connect.then(() => 
    {
        let a=1;
        getData(username).then((response)=>
        {
            if(response[0] && (response[0].id !== null))
            {
                res.status(200).json({request: "User exists"});
            }
            else
            {
                console.log("user created with", username, password);
                insertData(username, password);
                res.status(200).json({request: "Success"});
            };
        });
    });

})

app.listen(port, () => {
  console.log(`Login server listening on port ${port}`)
})