module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3 // 明确指定 core-js 版本
      }
    ]
  ],
  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}
