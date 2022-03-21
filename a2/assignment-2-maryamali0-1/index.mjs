import * as http from 'http';
import fs from 'fs';
import {VisitorCounter} from './counter.mjs';

const PORT = 4000;
const HOST = '127.0.0.1'

const server = http.createServer();
let counter = new VisitorCounter();
let template = fs.readFileSync('main.html').toString();

server.on('request', (req, resp) => {
    counter.addVisit();
    let v = counter.getCount();
    const html = template.replace('{{number}}', v);
    resp.writeHead(200, 'Content-Type: text/html');
    resp.end(html);
});

server.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`)