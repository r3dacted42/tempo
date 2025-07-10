import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

// https://vite.dev/config/
export default defineConfig({
  base: '/tempo/',
  plugins: [vue({
    ...templateCompilerOptions,
  })],
})
