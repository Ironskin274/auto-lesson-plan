import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import vitePluginBabel from 'vite-plugin-babel';
import VueRouter from 'unplugin-vue-router/vite';
import { resolve } from 'path'

export default defineConfig({
  plugins: [
      VueRouter(),
    Vue(),
    vitePluginBabel({
      babelConfig: {
        presets: ['@babel/preset-env']
      }
    })
  ],
  resolve: {
    alias: {
      '@':resolve('src'), // 配置别名，方便引用 src 目录下的文件
    }
  },
  server: {
    port: 3000, // 开发服务器端口
    proxy: {
      // 配置单个代理规则
      '/api': {
        target: 'http://localhost:8080', // 目标服务器地址
        changeOrigin: true, // 开启跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径
      },
      // 可以配置多个代理规则
      '/another-api': {
        target: 'http://another-server.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/another-api/, '')
      }
    }
  }
});