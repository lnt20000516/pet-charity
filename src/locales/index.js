import { createI18n } from 'vue-i18n'
import { zhCN, enUS } from 'naive-ui'
import zh_cn from './lang/zh-cn'
import en from './lang/en'
const messages = {
    "zh-CN": {
        el: zhCN,
        ...zh_cn
    },
    "en-US": {
        el: enUS,
        ...en
    }
}
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("language") || "zh-CN",
    fallbackLocale: "zh-CN",
    globalInjection: true,
    messages
})

export default i18n