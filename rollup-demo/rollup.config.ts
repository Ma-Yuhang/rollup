import { RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import clear from './plugins/rollup-plugin-clear'

const config: RollupOptions = {
  input: {
    main: 'src/main.ts',
    'index/haha': 'src/index.ts', 
  },
  output: {
    dir: 'dist',
    format: 'esm', // 输出格式为ES模块
    entryFileNames: '[name].[hash].js',
    chunkFileNames: 'chunk-[name].[hash].js',
    // manualChunks: {
    //   'lodash-es': ['lodash-es'],
    // },
    manualChunks(id) {
      // console.log(id, 'id');
      if (id.includes('node_modules')) {
        return 'vendor'
      }
    },
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      include: 'src/**',
      extensions: ['.js', '.ts'],
    }),
    typescript(),
    clear({
      targets: ['dist'],
      watch: true
    })
  ],
}
export default config
