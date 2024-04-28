import { createStore } from 'vuex'
import userStore from "./modules/user"
import adminStore from "./modules/admin";
import statisticsStore from './modules/statistics';
import donateStore from './modules/donate'
import petStore from './modules/pet'
import askStore from './modules/ask'
import adoptStore from './modules/adopt'
export default createStore({
  state: {

  },
  mutations: {

  },
  getters: {
  },

  actions: {
  },
  modules: {
    userStore, adminStore, statisticsStore, donateStore, petStore, askStore,adoptStore
  }
})
