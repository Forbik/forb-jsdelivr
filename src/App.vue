<template>
  <v-app>
    <AppHeader />
    <v-main>
      <SearchResult />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import SearchResult from './components/SearchResult'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

export default {
  name: 'App',

  components: {
    SearchResult,
    AppHeader,
    AppFooter
  }
}
</script>
