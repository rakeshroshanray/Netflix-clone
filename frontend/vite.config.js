import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://netflix-clone-1-nqci.onrender.com', // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Disable SSL verification for self-signed certificates (if needed)
        ws: true, // Enable WebSocket proxying (if using WebSockets)
      }
    }
  }
});
