// Serves the built Storybook (.local/storybook-static) on 127.0.0.1 for the browser tests. Node built-ins only.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '.local/storybook-static');
const port = Number(process.argv[3] ?? 6007);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1');
    const file = path.join(
      root,
      decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname),
    );
    // Never leave the root.
    if (!file.startsWith(root)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, {
        'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
      });
      res.end(data);
    });
  })
  .listen(port, '127.0.0.1', () => console.log(`Serving ${root} on http://127.0.0.1:${port}`));
