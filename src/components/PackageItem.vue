<template>
  <div class="d-md-flex pa-4 mb-4 package">
    <div class="package-content flex-grow-1">
      <div class="package-title">
        <span class="link-text text-h6" @click="showModal(packageInfo.name)">
          {{ packageInfo.name }}
        </span>
      </div>
      <div class="package-description">
        <span class="grey--text text--darken-1 subtitle-1">
          {{ packageInfo.description }}
        </span>
      </div>
      <div class="package-keywords d-flex flex-wrap my-2">
        <div
          v-for="(item, index) in packageInfo.keywords"
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
      <div class="package-publisher">
        <span class="subtitle-2">
          {{ packageInfo.publisher.username }}
        </span>
        <span class="body-2">
          published {{ packageInfo.version }}
        </span>
      </div>
    </div>
    <div class="package-score flex-shrink-0 d-flex align-center my-4">
      <div class="package-score-inner d-flex justify-space-between flex-column">
        <div
          v-for="(item, key) of scoreDetails"
          :key="`score-details-` + key"
          class="d-flex"
        >
          <div class="package-score-title pr-2">{{ key.charAt(0) }}</div>
          <div class="package-score-progress" :style="`background-color: ${getColorHash(key)} ;transform: scaleX(${item});`"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContainer',
  props: {
    item: Object,
    default: {}
  },
  computed: {
    packageInfo () {
      return this.item.package
    },
    scoreDetails () {
      return this.item.score?.detail
    }
  },
  methods: {
    showModal (packageName) {
      this.$store.commit('togglePackageDialog', true)
      this.$store.dispatch('fetchPackageByName', packageName)
    },
    searchByKeywords (item) {
      this.$store.commit('setSearchQuery', `keywords:${item}`)
      this.$store.dispatch('fetchPackages')
    },
    getColorHash (key) {
      const colorMap = {
        'quality': '#8956ff',
        'popularity': '#29abe2',
        'maintenance': '#cb3837'
      }
      return colorMap[key] || ''
    }
  }
}
</script>
<style lang="scss">
.link-text {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.package-score {
  &-inner {
    height: 30px;
    width: 90px;
  }
  &-title {
    font-size: 11px;
    line-height: 0.2em;
    text-align: right;
    width: 20px;
  }
  &-progress {
    width: 75px;
    height: 2px;
    transform-origin: left;
  }
}
</style>
