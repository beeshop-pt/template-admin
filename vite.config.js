import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    return {
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
    }
  }

  return {
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
      outDir: '../../beeshop/public/assets/admin',
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        },
      },
    }
  }
})
