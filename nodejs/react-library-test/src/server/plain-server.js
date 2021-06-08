const server = require('server');

const { get, post } = server.router;
const { header, status } = server.reply;

const cors = [
    ctx => header("Access-Control-Allow-Origin", "*"),
    ctx => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    ctx => header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, HEAD"),
    ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
];

// Launch server
server({ port: 3001 }, cors, [
    get('/endpoint', ctx => 'Hello world!'),
    ctx => status(404).send("Not found.")
]);