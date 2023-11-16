<template>
  <div class="pagination text-center">
    <v-pagination
      v-model="currentPage"
      :length="paginationLength"
      :total-visible="5"
    ></v-pagination>
  </div>
</template>
<script>
import { sync } from 'vuex-pathify'

export default {
  name: 'AppPagination',
  computed: {
    currentPage: sync('currentPage'),
    paginationLength () {
      return Math.round(this.$store.get('totalResults') / this.$store.get('limit'))
    }
  },
  watch: {
    currentPage: {
      handler () {
        this.$store.dispatch('fetchPackages')
      }
    }
  }
}
</script>
