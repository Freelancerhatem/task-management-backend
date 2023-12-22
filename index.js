const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// uri here
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@mytestappdata.1fvaci4.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const TaskCollection = client.db('TaskManageMent').collection('TaskData');

        app.post('/addTask',async(req,res)=>{
            const data = req.body;
            const result = await TaskCollection.insertOne(data);
            res.send(result);
        });
        app.get('/myTask',async(req,res)=>{
            const userEmail = req.query.email;
            const filter = {email:userEmail};
            const result = await TaskCollection.find(filter).toArray();
            res.send(result);
        })
        
            
    }
    finally {
    }
}
run()
app.get("/", (req, res) => { res.send("Crud is running..."); });
app.listen(port, () => { console.log(`Simple Crud is Running on port ${port}`); });
