import { createServer } from 'node:http';
import { createWriteStream } from 'node:fs';
import { parse } from 'node:url';

// Створення потоку для запису логів
const logStream = createWriteStream('logs.txt', { flags: 'a' });

// Функція логування запитів
function logRequest(req) {
    const ip = req.socket.remoteAddress; // Отримання IP
    const userAgent = req.headers['user-agent'] || 'Unknown'; // Отримання User-Agent
    const logMessage = `[${new Date().toISOString()}] IP: ${ip}, User-Agent: ${userAgent}, Path: ${req.url}\n`;

    console.log(logMessage.trim()); // Вивід у консоль
    logStream.write(logMessage); // Запис у файл
}

// Створення HTTP-сервера
const server = createServer((req, res) => {
    logRequest(req); // Викликаємо логування

    const { pathname } = parse(req.url, true); // Отримуємо шлях

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
    } else if (pathname === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Users list\n');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`ServerPogo is running at http://127.0.0.1:${PORT}`);
});

