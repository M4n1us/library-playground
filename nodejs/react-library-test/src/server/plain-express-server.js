const express = require("express");
const cors = require('cors'); //middleware for cors requests in express
const multer  = require('multer'); //middleware for multipart requests in express
const basicAuth = require('express-basic-auth') //middleware for basic auth in express
const app = express();
const port = 80;
const crypto = require("crypto");
const fs = require('fs');

const baseUrl = "https://files.combine.pria.at/"
const basePath = "./upload/"

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
    let folderbase = file.originalname + crypto.randomBytes(16).toString("hex");
    let folderLocation = basePath + crypto.createHash("sha256").update(folderbase).digest("hex");
    if (!fs.existsSync(folderLocation)){
        fs.mkdirSync(folderLocation);
    } else {
        console.log("Foldername collision");
    }
    console.log("destination: " + folderLocation)
    cb(null, folderLocation)
}

function createFilename(req, file, cb) {
    let alteredFilename = file.originalname + crypto.randomBytes(16).toString("hex");
    let tmp = file.originalname.split('\.');
    let fileEnding = "";
    if(tmp.length > 1){
        fileEnding = "." + tmp.pop();
    }
    let finalName = crypto.createHash("sha256").update(alteredFilename).digest("hex") + fileEnding;
    cb(null, finalName)
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
        ret[file.fieldname] = baseUrl + file.path.replace(/\\/g,"/");
    }
    res.status(200).send(ret);
})

//express start
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})