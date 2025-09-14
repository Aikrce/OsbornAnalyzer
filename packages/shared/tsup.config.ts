import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/data/index.ts',
    'src/algorithms/index.ts',
    'src/types/index.ts',
    'src/utils/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['react', 'react-dom'],
});