// File di setup per i test con Vitest

// Importa le librerie necessarie per il testing di React
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { configureAxe } from 'jest-axe';

// Configurazione globale per jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Estende i matcher di expect con quelli di @testing-library/jest-dom
expect.extend(matchers);

// Pulisce il DOM dopo ogni test
afterEach(() => {
  cleanup();
});