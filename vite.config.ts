import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(),

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3001,
   
    origin: 'http://localhost:5173', // 👈 necesario para evitar CORS

  },
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL || 'http://localhost/api'),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,

    lib: {
      entry: path.resolve(__dirname, 'src/single-spa-config.ts'),
      formats: ['system'],
      fileName: () => 'school-microfront.system.js',
    },
    rollupOptions: {
      external: [],
      output: {
        format: 'system',
      },
    },
  },
});
