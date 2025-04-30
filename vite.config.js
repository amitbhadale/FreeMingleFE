import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // Load .env files based on mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_API_URL, // use env prefix VITE_
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
