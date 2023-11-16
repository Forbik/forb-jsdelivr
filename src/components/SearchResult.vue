<template>
  <v-container class="mt-4">
    <template v-if="noResults">
      <NoResults />
    </template>
    <template v-else-if="packages && packages.length > 0">
      <PackageItem
        v-for="(item, index) of packages"
        :key="`package-` + index"
        :item="item"
      />
      <AppPagiantion
        v-if="paginationLength > 0"
      />
    </template>
    <template v-else>
      <WelcomeText />
    </template>
    <v-dialog
      v-model="isShownPackageDialog"
      content-class="elevation-5"
      overlay-opacity=".08"
      width="800"
    >
      <PackageDialog />
    </v-dialog>
  </v-container>
</template>

<script>
import { get } from 'vuex-pathify'

import AppPagiantion from './AppPagiantion'
import PackageDialog from './PackageDialog'
import PackageItem from './PackageItem'
import NoResults from './NoResults'
import WelcomeText from './WelcomeText'

export default {
  name: 'AppContainer',
  components: {
    AppPagiantion,
    PackageDialog,
    PackageItem,
    NoResults,
    WelcomeText
  },
  computed: {
    searchQuery: get('searchQuery'),
    packages: get('packages'),
    packageDialog: get('packageDialog'),
    paginationLength: get('paginationLength'),
    noResults: get('noResults'),
    isShownPackageDialog: {
      get () { return this.packageDialog },
      set (val) {
        this.$store.commit('togglePackageDialog', val)
      }
    }
  }
}
</script>
<style lang="scss">
.package {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
}
</style>
