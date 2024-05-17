import { defineConfig } from 'rollup'

// 一个入口有不同的导出配置
export default defineConfig({
  input: 'src/index.js',
  // 多出口 esm commonjs umd iife
  output: [
    {
      dir: 'dist/esm',
      format: 'esm', // 输出格式为ES模块
    },
    {
      dir: 'dist/cjs',
      format: 'cjs', // 输出格式为cjs模块
    },
  ],
})

// 不同的入口有不同的导出配置
// export default defineConfig([
//   {
//     input: 'src/index.js',
//     // 多出口 esm commonjs umd iife
//     output: {
//       dir: 'dist/esm',
//       format: 'esm', // 输出格式为ES模块
//     },
//   },
//   {
//     input: 'src/main.js',
//     output: {
//       dir: 'dist/cjs',
//       format: 'cjs', // 输出格式为cjs模块
//     },
//   },
// ])

// export default defineConfig({
//   input: ['src/index.js', 'src/main.js'],
//   // 多出口 esm commonjs umd iife
//   output: {
//     dir: 'dist',
//     format: 'esm', // 输出格式为ES模块
//   },
// })
