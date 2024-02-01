import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'
import Env from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), Env('all')],
  resolve: {
    alias: {
      components: resolve(__dirname, './src/components'),
      hooks: resolve(__dirname, './src/hooks')
    }
  }
})
