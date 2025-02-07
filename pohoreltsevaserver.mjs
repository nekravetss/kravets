// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
const reqUrl = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
console.log(reqUrl.pathname);
switch(reqUrl.pathname){
case'/':{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(<div>Hello World!</div>);
    break;
}
case'/users':{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(<div>Users page</div>);
    break;
}
case'/error':{
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(<div>Not Found</div>);
    break;
}

}
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
