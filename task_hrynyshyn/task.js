const { createServer } = require('http');
const { readFile } = require('fs');
const path = require('path');

const server = createServer((req, res) => {
    const reqURL = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
    console.log(reqURL.pathname);

    switch (reqURL.pathname) {
        case '/': {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<div>Hello World!</div>');
            break;
        }
        case '/users': {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<div>Users page</div>');
            break;
        }
        case '/favicon.ico': {
            const filePath = path.join(__dirname, 'favicon.ico');
            readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Favicon not found\n');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            });
            break;
        }
        default: {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 not found\n');
            break;
        }
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
