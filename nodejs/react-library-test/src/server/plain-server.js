const server = require('server');

const { get, post, error } = server.router;
const { header, status, send } = server.reply;

const cors = [
    ctx => header("Access-Control-Allow-Origin", "*"),
    ctx => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    ctx => header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, HEAD"),
    ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
];

function log(ctx){
    console.log("Request:");
    console.log(ctx.method);
    console.log(ctx.query);
    console.log(ctx.data);
    console.log(ctx.files)
}

// Launch server
server({ port: 3001, security:{csrf: false} }, cors,
    [
        get('/endpoint', ctx => 'Hello world!'),
        post('/upload', ctx => {
            log(ctx);
            return send("Received")
        })
    ],
    ctx => {log(ctx); throw new Error('Route not configured')}
    );