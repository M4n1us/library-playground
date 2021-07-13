const express = require("express");
const cors = require('cors'); //middleware for cors requests in express
const multer  = require('multer'); //middleware for multipart requests in express
const basicAuth = require('express-basic-auth') //middleware for basic auth in express
const app = express();
const port = 3001;

const baseUrl = "https://files.combine.pria.at/"

//cors config
const users = {
    users: {'combineFileServer': '~isCool!~'}
};

//multer config
const storage = multer.diskStorage({
    destination: createDestination,
    filename: createFilename
})

function createDestination(req, file, cb) { //called for each file
    console.log("destination")
    cb(null, './upload')
}

function createFilename(req, file, cb) {
    cb(null, file.originalname)
}

const upload = multer({storage: storage})

//express config
app.use(cors()); //enables cors from every domain for all routes

app.get('/endpoint', (req, res) => {
    res.send('Hello world!');
})

app.post('/upload',  basicAuth(users), upload.any(), (req, res) => {
    console.log(req.files); //data about files
    console.log("oh boi");
    let ret = {}
    for(let file of req.files){
        ret[file.fieldname] = file.path;
    }
    res.status(200).send(ret);
})

//express start
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})