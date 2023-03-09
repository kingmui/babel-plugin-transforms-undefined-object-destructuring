import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import terser from '@rollup/plugin-terser';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    babel({ extensions, include: ['src/**/*'], exclude: 'node_modules/**' }),
    sourcemaps(),
    terser(),
  ],
}
