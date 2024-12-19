import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target:  "https://netflix-clone-2-ad78.onrender.com/api",
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
