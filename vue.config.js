const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack:(config)=>{
    config.resolve.alias.set("vue-i18n","vue-i18n/dist/vue-i18n.cjs.js");
  }
})
