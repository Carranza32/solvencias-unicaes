import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    statistics: {},
    borrowerDetailsModalStatus: false,
  },
  getters: {
  },
  mutations: {
    changeBorrowerDetailsModalStatus(state, visible) {
        state.borrowerDetailsModalStatus = visible
    },
  },
  actions: {
  },
  modules: {
  }
})
