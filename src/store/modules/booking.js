import httpClient from '@/utils/httpClient'
export default {
  namespaced: true,
  state: {
    airports: [],
    bookingInfo: {},
  },
  getters: {
    get_airports: (state) => (code) => {
      return state.airports.filter((x) => x.code != code)
    },
  },
  mutations: {
    set_airports(state, airports) {
      state.airports = airports
    },
    set_bookingInfo(state, payload) {
      state.bookingInfo = payload
    },
  },
  actions: {
    async fetchAirports({ commit }) {
      try {
        const resp = await httpClient.GET(
          '/api/v1/Airport/OriginsWithConnections/en-us',
        )
        if (resp && resp.status == 200) {
          commit('set_airports', resp.data.airports)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async search({ commit }, payload) {
      try {
        commit('set_bookingInfo', payload)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
