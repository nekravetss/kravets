import { createServer } from 'node:http';
import { createWriteStream, readFile } from 'node:fs';
import { join } from 'node:path';
import { URL } from 'url';
const logFile = join(process.cwd(), 'log.txt');
const logStream = createWriteStream(logFile, { flags: 'a' });
const faviconPath = join(process.cwd(), 'favicon.ico');

const server = createServer((req, res) => {
    const reqUrl = new URL(req.url, 'http://localhost');

    switch (reqUrl.pathname) {
        case '/': {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1 style="font-size: 24px; font-weight: bold;">lol</h1>');
            break;
        }

        case '/user': {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1 style="font-size: 24px; font-weight: bold;">kek</h1>');
            break;
        }

        case '/favicon.ico': {
            readFile(faviconPath, (err, data) => {
                if (err) {
                    console.error('Ошибка загрузки favicon.ico:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error loading favicon.ico\n');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            });
            break;
        }

        default: {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1 style="font-size: 24px; font-weight: bold;">404 Not Found</h1>');
            break;
        }
    }
    const clientIP = req.socket.remoteAddress || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
    const logEntry = `[${new Date().toISOString()}] IP: ${clientIP} | User-Agent: ${userAgent} | Path: ${reqUrl.pathname}\n`;

    console.log(logEntry.trim());
    logStream.write(logEntry);
});

server.listen(4000, '127.0.0.1', () => {
    console.log('Сервер запущен');
});
