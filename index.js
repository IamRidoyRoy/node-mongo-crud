const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Use middleware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Running my node crud server');
});

app.listen(port, () => {
    console.log('Crud server is running');
})


// For mongoDb connection:
const { MongoClient, ServerApiVersion } = require('mongodb');
const { send } = require('express/lib/response');
const uri = "mongodb+srv://dbuser1:qWDimG0ngJsC64iR@cluster0.fq0uj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const ObjectId = require('mongodb').ObjectId;
async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        // const user = { name: 'Monisha', email: 'monisha@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(`User inserted with id: ${result.insertedId}`);

        // Show data on UI or get 
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const user = await cursor.toArray();
            res.send(user)
        })

        // Post data 
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log("adding new user", newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })
        // delete a user 
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })





    }
    finally {
        // await client.close();
    }


}

run().catch(console.dir);