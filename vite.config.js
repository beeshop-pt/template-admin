import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@helpers': resolve('../template-helpers')
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/admin/[name].js`,
        chunkFileNames: `assets/admin/[name].js`,
        assetFileNames: `assets/admin/[name].[ext]`,
      },
    },
  }
})
