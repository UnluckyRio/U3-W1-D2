import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Configurazione per i test
    environment: 'jsdom', // Ambiente di test per componenti React
    globals: true, // Abilita variabili globali come describe, it, expect
    setupFiles: ['./tests/setup.js'], // File di setup per i test
    include: ['./tests/**/*.{test,spec}.{js,jsx}'], // Pattern per i file di test
    coverage: {
      reporter: ['text', 'json', 'html'], // Reporter per la copertura del codice
      exclude: ['node_modules/', 'tests/setup.js'] // Esclusioni dalla copertura
    }
  }
});