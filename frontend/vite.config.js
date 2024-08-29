import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://netflix-clone-1-nqci.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`Proxying request: ${path}`);
          return path.replace(/^\/api/, '');
        },
        secure: false,
        ws: true,
      }
    }
  }
});
