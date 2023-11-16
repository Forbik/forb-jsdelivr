<template>
  <v-text-field
    v-model="search"
    @input="handleSearch"
    dense
    label="Search packages"
    prepend-inner-icon="mdi-magnify"
    outlined
    single-line
    hide-details
  />
</template>
<script>
import { sync } from 'vuex-pathify'
import { debounce } from 'lodash'
  export default {
    name: 'SearchField',
    computed: {
      search: sync('searchQuery')
    },
    watch: {
      search(newValue) {
        if (newValue === '') {
          this.$store.commit('clearSearchResult')
        }
      },
    },
    methods: {
      handleSearch: debounce(function (query) {
        if (query && this.search.length > 0) {
          this.$store.dispatch('fetchPackages')
        }
      }, 500)
    }
  }
</script>
