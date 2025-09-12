import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-toast'],
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for better performance
    target: 'es2015', // Better browser support while maintaining performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove ALL console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info', 'console.group', 'console.groupEnd'], // Remove specific console methods
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
}));
