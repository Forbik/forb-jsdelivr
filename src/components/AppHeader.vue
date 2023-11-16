<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-container>
      <div class="d-flex">
        <div class="d-flex align-center">
          <v-btn
            href="/forb-jsdelivr/"
            text
            class="px-1 px-md-2 mr-4"
          >
            <v-icon>mdi-package-variant</v-icon>
            <span class="ml-2">JsDelivr</span>
          </v-btn>
        </div>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
          absolute
          bottom
          color="teal lighten-3"
        ></v-progress-linear>
        <v-spacer />
        <SearchField />
        <v-spacer />
        <v-btn
          href="https://github.com/Forbik/forb-jsdelivr"
          class="px-1 px-md-2 hidden-sm-and-down"
          target="_blank"
          text
        >
          <span class="mr-2">GitHub repo</span>
          <v-icon size="large">mdi-open-in-new</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { get } from 'vuex-pathify'

import SearchField from './SearchField.vue'
export default {
  name: 'AppHeader',
  components: {
    SearchField
  },
  computed: {
    isLoading: get('isLoading')
  }
}
</script>
