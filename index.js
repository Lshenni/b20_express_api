//import express
let express = require('express');
const { default: mongoose } = require('mongoose');
let tweetsmodel = require('./model/tweets');
let cors = require('cors');

// create express app
let app = express();

let PORT = 1234;

let tweets = [
    {
        "id": 1,
        "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "likes": 592,
        "dislikes": 32,
        "username": "Stefania",
        "profilepic": "https://logo.clearbit.com/seattletimes.com"
    },
    {
        "id": 2,
        "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "likes": 756,
        "dislikes": "01",
        "username": "Gayel",
        "profilepic": "https://logo.clearbit.com/bbc.co.uk"
    }
]

// configure express to encode/decode JSON
app.use(express.json());

//configure cors to accept incoming request from all ip port
app.use(cors())

//connect to mongodb
let connectionString = "mongodb+srv://leeshenni:Shenni1610@cluster0.xskumm3.mongodb.net/tweetscloud"

mongoose.connect(connectionString)
let db = mongoose.connection

//check if db conection is sucess
db.on("open",()=>{
    console.log("connected to mongodb in cloud")
})


// create first api endpoint
// API url : http://localhost:1234/
// Endpoint is root
// REQUEST METHOD: GET
app.get("/", (request, response) => {
    console.log("endpoint called ->" + request.url + "with method " + request.method)

    // send response
    response.status(200).json({ 'message': "welcome to rest api with express", "method": "GET" })
})

//get list of all documents from mongodb
app.get("/1.0/tweets/all", (req,res)=>{
    console.log(`endpoint: ${req.url} success, method: ${req.method}`)
    //interact with mongodb using model file
    tweetsmodel.find({})
                .then(data=>{
                    //set response status to 200 and send data back to client as response
                    res.status(200).json(data);
                })
                .catch(error=>{
                    console.log(` ${req.url} failure`)
                    res.status(500).json(error);
                })

})





// create first api endpoint
// API url : http://localhost:1234/
// Endpoint is root
// REQUEST METHOD: POST
app.post("/", (request, response) => {
    console.log("endpoint called ->" + request.url + "with method " + request.method)

    // send response
    response.status(200).json({ 'message': "welcome to rest api with express", 'method': "POST" })
})


// create api endpoint
// API url : http://localhost:1234/tweets
// Endpoint is /tweets
// REQUEST METHOD: GET
app.get("/tweets", (request, response) => {
    console.log("endpoint called ->" + request.url + "with method " + request.method)

    response.json(tweets)
    // // send response
    // response.status(200).json({ 'message': "welcome to rest api with express", "method": "GET" })
})


// add a new tweet
app.post("/1.0/tweets/add", (request, response) => {
    console.log("endpoint called ->" + request.url + "with method " + request.method)

    //extract request body or request payload
    let requestBody = request.body
    console.log(requestBody)

    //create a new instance of model
    //assign requestbody to the new instance
    let tweetsmodelNew = new tweetsmodel(requestBody)
    
    //save the new instance -> tweets model new to database
    tweetsmodelNew.save()
        .then(data=>{
            console.log(`${request.url} successfully added`)
            response.status(200).json(data)
        })
        .catch(error=>{
            console.log(`${request.url} successfully added`)
            response.status(500).json(error)
        })

})

//update tweets, use colon for getting the dynamic input
app.put("/1.0/tweets/update/:id", (request, response) => {
    console.log("endpoint called ->" + request.url + "with method " + request.method)

    //extract request body or request payload
    let requestBody = request.body
    console.log(requestBody)

    //read the path parameter
    let id = request.params.id

    //find the doc with given id n update it wih req body
    tweetsmodel.findByIdAndUpdate(id, requestBody, {new: true})
    .then(data=>{
        console.log(`${request.url} successfully added`)
        response.status(200).json(data)
    })
    .catch(error=>{
        console.log(`${request.url} failure`)
        response.status(500).json(error)
    })

})

// delete tweet
app.delete("/1.0/tweets/delete/:id", (request, response) => {
    console.log("endpoint called ->" + request.url + "with method " + request.method)

    //extract request body or request payload
    let requestBody = request.body
    console.log(requestBody)

    //read the path parameter
    let id = request.params.id

    //find the doc with given id n update it wih req body
    tweetsmodel.findByIdAndDelete(id, requestBody, {new: true})
    .then(data=>{
        console.log(`${request.url} successfully deleted`)
        response.status(200).json(data)
    })
    .catch(error=>{
        console.log(`${request.url} failure`)
        response.status(500).json(error)
    })

})




app.listen(PORT, () => {
    console.log(`listening on port, ${PORT}`);
})
