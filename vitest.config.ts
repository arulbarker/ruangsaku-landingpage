import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/.next/**', '**/.vercel/**'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['lib/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'app/api/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/__tests__/**', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // server-only throws at runtime in non-Next contexts (Vitest/jsdom).
      // Alias to the package's own no-op stub so server modules can be unit-tested.
      'server-only': path.resolve(__dirname, 'node_modules/server-only/empty.js'),
    },
  },
})
