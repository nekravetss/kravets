// server.mjs
import { createServer } from 'node:http';
import { URL } from 'node:url';

const PORT = 3000;
const HOST = '127.0.0.1';

const requestHandler = (req, res) => {
    const url = new URL(req.url, `http://${process.env.HOST ?? 'localhost'}`);
    console.log(`Requested path: ${url.pathname}`);

    const routes = {
        '/': { status: 200, content: '<div>Hello World!</div>' },
        '/users': { status: 200, content: '<div>Users page</div>' },
        '/error': { status: 404, content: '<div>Not Found</div>' }
    };

    const response = routes[url.pathname] ?? { status: 404, content: '<div>Page not found</div>' };

    res.writeHead(response.status, { 'Content-Type': 'text/html' });
    res.end(response.content);
};

const server = createServer(requestHandler);

server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
