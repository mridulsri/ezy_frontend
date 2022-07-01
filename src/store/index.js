import Vue from 'vue'
import Vuex from 'vuex'
import bookingModule from './modules/booking'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false,
    // errorPage: false,
  },
  getters: {},
  mutations: {
    set_loader(state, payload) {
      state.loader = payload
    },
  },
  actions: {},
  modules: {
    booking: bookingModule,
  },
})
