import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      'components': resolve(__dirname, './src/components'),
      'hooks': resolve(__dirname, './src/hooks')
    }
  }
})
