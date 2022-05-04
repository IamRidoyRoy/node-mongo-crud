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
const uri = "mongodb+srv://dbuser1:qWDimG0ngJsC64iR@cluster0.fq0uj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        const user = { name: 'Monisha', email: 'monisha@gmail.com' };
        const result = await userCollection.insertOne(user);
        console.log(`User inserted with id: ${result.insertedId}`);

        // Post data 
        app.post('/user', (req, res) => {
            const newUser = req.body;
            console.log("adding new user", newUser);
            res.send({ result: "User data received!" })
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);