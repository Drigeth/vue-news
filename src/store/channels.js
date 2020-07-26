import { getNewsChannels } from "../services/newsService"

export default {
  namespaced: true,
  state: {
    data: [],
    isLoading: false
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setData(state, payload) {
      state.data = payload
    }
  },
  actions: {
    async fetchDatas(context) {
      context.commit("setIsLoading", true)
      let channels = await getNewsChannels()
      context.commit("setIsLoading", false)
      context.commit("setData", channels)
    }
  }
}