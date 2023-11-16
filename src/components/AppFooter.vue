<template>
  <v-footer
    absolute
    inset
    app
    color="grey lighten-3"
  >
    <v-container class="text-center pa-3">
      <strong>© Oleksandr Semenov</strong>, {{ new Date().getFullYear() }}
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'AppFooter',
  }
</script>
