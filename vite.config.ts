import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
// export default defineConfig({
//   base: './',
//   plugins: [react(), legacy({
//     targets: ['> 1%', 'last 2 versions', 'Android >= 4.4', 'Safari >= 10'],
//     renderModernChunks: false
//   })],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//     extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
//   },
//   assetsInclude: ['assets/**/*'],
// });



// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, "index.html"),
//         404: resolve(__dirname, "public/404.html"),
//       },
//     },
//   },
// });

export default defineConfig(({ mode }) => {
  var base = {
    base: 'https://3100-robotics.github.io/aurelia',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          404: resolve(__dirname, "public/404.html"),
        },
      },
    },
    plugins: [react(), commonjs()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    assetsInclude: ['assets/**/*'],
  }
  if (mode === 'android') {base['base'] = './'}

  
  return base
});
