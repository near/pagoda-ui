import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcssPresetEnv from 'postcss-preset-env';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

/** @type {import('rollup').RollupOptions} */
const options = {
  input: ['./src/index.ts'],
  output: [
    {
      file: './dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ browser: true }),
    commonjs(),
    typescript(),
    terser(),
    copy({
      targets: [
        { src: './src/styles/globals.css', dest: 'dist' },
        { src: './src/styles/theme.css', dest: 'dist' },
      ],
    }),
    postcss({
      extract: 'lib.css',
      modules: true,
      syntax: 'postcss-scss',
      plugins: [
        postcssPresetEnv({
          stage: 3,
          features: {
            'nesting-rules': true,
          },
        }),
      ],
    }),
    del({ targets: 'dist/styles.css' }),
    visualizer(),
  ],
};

export default options;
