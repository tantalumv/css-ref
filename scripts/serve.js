/**
 * Development server with compression support
 * Works with both Node.js and Bun
 * 
 * Usage:
 *   node scripts/serve.js
 *   bun scripts/serve.js
 */

import { join } from 'path';

const PORT = process.env.PORT || 2005;
const DIST_DIR = join(process.cwd(), 'dist');

// Detect runtime
const isBun = typeof Bun !== 'undefined';

if (isBun) {
  // Bun server with automatic compression
  console.log(`🚀 Starting Bun dev server on port ${PORT}...`);
  
  const server = Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let path = url.pathname === '/' ? '/index.html' : url.pathname;
      
      // Serve from dist/ for bundle files, root for others
      let filePath;
      if (path.startsWith('/dist/')) {
        filePath = join(process.cwd(), path.slice(1));
      } else {
        filePath = join(process.cwd(), path.slice(1));
      }
      
      try {
        const file = await Bun.file(filePath);
        return new Response(file);
      } catch (e) {
        return new Response('Not found', { status: 404 });
      }
    },
  });
  
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📦 Serving from: ${process.cwd()}`);
  console.log(`🗜️  Compression: enabled (Bun automatic)`);
} else {
  // Node.js server
  console.log(`🚀 Starting Node.js dev server on port ${PORT}...`);
  
  import('http').then(({ createServer }) => {
    import('fs').then(({ createReadStream, stat }) => {
      import('zlib').then(({ createGzip, createBrotliCompress }) => {
        import('url').then(({ fileURLToPath }) => {
          const server = createServer((req, res) => {
            let path = req.url === '/' ? '/index.html' : req.url;
            
            // Remove query strings
            path = path.split('?')[0];
            
            // Serve from dist/ for bundle files, root for others
            let filePath;
            if (path.startsWith('/dist/')) {
              filePath = join(process.cwd(), path.slice(1));
            } else {
              filePath = join(process.cwd(), path.slice(1));
            }
            
            stat(filePath, (err, stats) => {
              if (err || !stats.isFile()) {
                res.writeHead(404);
                res.end('Not found');
                return;
              }
              
              // Determine encoding based on Accept-Encoding header
              const acceptEncoding = req.headers['accept-encoding'] || '';
              let encoding = null;
              
              if (acceptEncoding.includes('br')) {
                encoding = 'br';
              } else if (acceptEncoding.includes('gzip')) {
                encoding = 'gzip';
              }
              
              // Set headers
              const headers = {
                'Content-Type': getContentType(filePath),
                'Cache-Control': 'no-cache',
              };
              
              if (encoding) {
                headers['Content-Encoding'] = encoding;
              }
              
              res.writeHead(200, headers);
              
              // Stream file with compression
              const stream = createReadStream(filePath);
              
              if (encoding === 'br') {
                stream.pipe(createBrotliCompress()).pipe(res);
              } else if (encoding === 'gzip') {
                stream.pipe(createGzip()).pipe(res);
              } else {
                stream.pipe(res);
              }
            });
          });
          
          server.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
            console.log(`📦 Serving from: ${process.cwd()}`);
            console.log(`🗜️  Compression: enabled (gzip + brotli)`);
          });
        });
      });
    });
  }).catch(err => {
    console.error('❌ Failed to start server:', err.message);
    console.log('\n💡 Install serve package: npm install serve');
    console.log('   Or use: npx serve . -p ' + PORT);
    process.exit(1);
  });
}

function getContentType(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'svg': 'image/svg+xml',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'gif': 'image/gif',
    'ico': 'image/x-icon',
    'woff2': 'font/woff2',
    'woff': 'font/woff',
  };
  return types[ext] || 'application/octet-stream';
}
