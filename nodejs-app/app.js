const http = require('http');

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "dev";
const DB_USER = process.env.DB_USER || "not-set";

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello from Node.js!
Environment: ${APP_ENV}
DB User: ${DB_USER}\n`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

