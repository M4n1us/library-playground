const server = require('server');

const { get, post, error } = server.router;
const { header, status, send } = server.reply;

const user = 'combineFileServer';
const password = '~isCool!~';

const cors = [
    ctx => header("Access-Control-Allow-Origin", "*"),
    ctx => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization"),
    ctx => header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, HEAD"),
    ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
];

function log(ctx){
    console.log("Request:");
    console.log(ctx.method);
    console.log(ctx.query);
    console.log(ctx.data);
    console.log("Files:");
    console.log(ctx.files);
}

function decodeBasicAuthHeader(basicAuthHeader){
    let token = basicAuthHeader.split(" ")[1];
    token = Buffer.from(token, 'base64').toString('utf-8');
    let splitToken = token.split(":");
    let user = splitToken.shift(); //gets first element from array and removes it
    let password = splitToken.join('') // creates password from remaining entries
    return {user: user, password: password};
}

function isAuthValid(auth){
    return auth.user === user && auth.password === password;
}

// Launch server
server({ port: 3001, security:{csrf: false} }, cors,
    [
        get('/endpoint', ctx => 'Hello world!'),
        post('/upload', ctx => {
            //log(ctx);
            console.log("Received Upload:")
            let auth = decodeBasicAuthHeader(ctx.headers.authorization);
            console.log(auth)
            console.log(isAuthValid(auth))
            return send("Received")
        }),
        error(ctx => {log(ctx); status(500).send(ctx.error.message)})
    ],
    );