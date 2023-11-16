import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { createEndpoint } from '@/helpers/api'
import pathify, { make } from 'vuex-pathify'

const state = () => {
  return {
    packages: [],
    searchQuery: '',
    currentPackage: [],
    packageDialog: false,
    currentPage: 1,
    limit: 10,
    totalResults: 0,
    paginationLength: 0,
    noResults: false,
    isLoading: false
  }
}

const store = {
  state,
  mutations: {
    ...make.mutations(state),
    setPackages: (state, payload) => {
      state.packages = payload.objects
      state.totalResults = payload.total
      state.paginationLength = Math.round(payload.total / state.limit)
      state.noResults = payload.total === 0
    },
    setSearchQuery: (state, payload) => {
      state.searchQuery = payload
    },
    setCurrentPackage: (state, payload) => {
      state.currentPackage = payload
    },
    clearSearchResult: (state) => {
      state.searchQuery = ''
      state.packages = []
      state.totalResults = 0
      state.paginationLength = 0
      state.noResults = false
    },
    toggleLoadingState: (state, payload) => {
      state.isLoading = payload
    },
    togglePackageDialog: (state, payload) => {
      state.packageDialog = payload
    }
  },
  actions: {
    async fetchPackages ({commit, state}) {
      commit('toggleLoadingState', true)
      try {
        const endpointURL = createEndpoint('-/v1/search', {
          text: state.searchQuery,
          size: state.limit,
          from: (state.currentPage - 1) * state.limit
        })
        const resp = await axios.get(endpointURL)
        commit('setPackages', resp.data)
        commit('toggleLoadingState', false)
      } catch (err) {
        commit('toggleLoadingState', false)
        console.warn(err)
      }
    },
    async fetchPackageByName ({commit}, quety) {
      commit('toggleLoadingState', true)
      try {
        const endpointURL = createEndpoint(quety)
        const resp = await axios.get(endpointURL)
        commit('setCurrentPackage', resp.data)
        commit('toggleLoadingState', false)
      } catch (err) {
        commit('toggleLoadingState', false)
        console.warn(err)
      }
    }
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [ pathify.plugin ],
  ...store
})