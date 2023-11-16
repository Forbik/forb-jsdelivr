<template>
  <div class="package-dialog">
    <v-card v-if="isLoading">
      <v-card-text>
        <v-skeleton-loader
          elevation
          type="table-heading, article, article"
        ></v-skeleton-loader>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-title class="text-h5 grey lighten-2">
        {{ currentPackage.name }}
        <v-spacer />
        <v-btn
          icon
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-list-item v-if="currentPackage.author">
          <v-list-item-icon>
            <v-icon v-text="`mdi-account`"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ currentPackage.author.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="currentPackage.author && currentPackage.author.email">
          <v-list-item-icon>
            <v-icon v-text="`mdi-email-outline`"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ currentPackage.author.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="currentPackage.description">
          <v-list-item-icon>
            <v-icon v-text="`mdi-text`"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ currentPackage.description }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="currentPackage.keywords">
          <v-list-item-content>
            <v-list-item-title class="mb-2"><strong>Keywords:</strong></v-list-item-title>
              <div class="d-flex flex-wrap">
                <div
                  v-for="(item, index) in currentPackage.keywords"
                  :key="index"
                >
                  <v-chip
                    class="mr-2 mb-2"
                    label
                    @click="searchByKeywords(item)"
                  >
                    {{ item }}
                  </v-chip>
                </div>
              </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="currentPackage.readme">
          <v-list-item-content>
            <v-list-item-title><strong>Readme:</strong></v-list-item-title>
            <div v-html="currentPackage.readme"></div>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>

      <!-- <v-divider></v-divider> -->
    </v-card>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'PackageDialog',
  computed: {
    currentPackage: get('currentPackage'),
    packageDialog: get('packageDialog'),
    isLoading: get('isLoading')
  },
  methods: {
    closeDialog () {
      this.$store.commit('togglePackageDialog', false)
    },
    searchByKeywords (item) {
      this.closeDialog()
      this.$store.commit('setSearchQuery', `keywords:${item}`)
      this.$store.dispatch('fetchPackages')
    }
  }
}
</script>
