// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Create HTTP server
const server = createServer((req, res) => {
  // Default to index.html if no specific file is requested
  let filePath = req.url === '/' ? 'index.html' : req.url;

  // Resolve full path to file
  filePath = join(__dirname, filePath);

  // Determine file extension
  const ext = extname(filePath).toLowerCase();

  // Set correct Content-Type
  let contentType = 'text/plain';
  switch (ext) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    default:
      contentType = 'application/octet-stream';
  }

  // Read and serve the file
  readFile(filePath, (err, data) => {
    if (err) {
      // Handle 404 or server errors
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain' });
      res.end(err.code === 'ENOENT' ? '404: File Not Found' : '500: Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Start server
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000');
});