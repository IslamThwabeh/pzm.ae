import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'redirect-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Remove trailing slashes
          if (req.url.endsWith('/') && req.url.length > 1) {
            res.writeHead(301, { Location: req.url.slice(0, -1) });
            res.end();
            return;
          }

          // Redirect /blog.html to /blog
          if (req.url === '/blog.html') {
            res.writeHead(301, { Location: '/blog' });
            res.end();
            return;
          }

          // Redirect /index.html to /
          if (req.url === '/index.html') {
            res.writeHead(301, { Location: '/' });
            res.end();
            return;
          }

          next();
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./css/main.css";`
      }
    }
  },
  server: {
    open: true,
    watch: {
      usePolling: true
    }
  }
});