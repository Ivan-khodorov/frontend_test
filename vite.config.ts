import { defineConfig } from 'vite';

export default defineConfig({
    root: 'frontend',
    base: "frontend_test",
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true
    },
    css: {
        preprocessorOptions: {
            scss: {
            }
        }
    }
});
