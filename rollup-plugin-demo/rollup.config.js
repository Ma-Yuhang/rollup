import { defineConfig } from 'rollup'
import example1 from './plugins/rollup-plugin-example1.js'
import image from './plugins/rollup-plugin-image.js'

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    // example1()
    image(),
  ],
})
