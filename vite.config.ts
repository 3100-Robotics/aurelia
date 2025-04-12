import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

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

export default defineConfig(({ mode }) => {
  var base = {
    base: './Aurelia',
    plugins: [react(), legacy({
      targets: ['> 1%', 'last 2 versions', 'Android >= 4.4', 'Safari >= 10'],
      renderModernChunks: false
    })],
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
