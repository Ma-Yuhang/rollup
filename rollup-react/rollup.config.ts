import { RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import replace from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import clear from 'rollup-plugin-clear'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import { fileURLToPath } from 'node:url'
import { visualizer } from "rollup-plugin-visualizer";

const config: RollupOptions = {
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    // sourcemap: true,
    entryFileNames: '[name].[hash].js',
    chunkFileNames: 'chunk-[name].[hash].js',
    // 分包
    // manualChunks: {
    //   react: ['react', 'react-dom'],
    // },
    plugins: [terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    })],
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    paths: {
      react: 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm',
      'react-dom': 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm',
    },
  },
  // 忽略，不打包react和react-dom
  external: ['react', 'react-dom'],
  plugins: [
    visualizer(),
    commonjs(),
    nodeResolve(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      include: 'src/**/*',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    replace({
      // 需要将字符串做一下替换 process is not defined
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    serve('dist'),
    livereload('src'),
    clear({
      targets: ['dist'],
      watch: true,
    }),
    postcss({
      extensions: ['.css'], // 将scss解析成css
      extract: true,
      // modules: true,
    }),
    htmlTemplate({
      template: './index.html',
      target: 'dist/index.html',
      attrs: ['type=module'],
    }),
    image(),
    alias({
      entries: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    }),
  ],
}

export default config
