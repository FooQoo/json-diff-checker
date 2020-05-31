<template>
  <v-app dark>
    <v-app-bar class="header-block">
      <nuxt-link class="routerLink" to="/">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer class="footer-block">
      <v-col class="copyright text-center">&copy; {{ copyright }}</v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      copyright: 'Copyright © 2020 FooQoo Inc. All Rights Reserved.',
      title: 'Json Diff Checker'
    };
  }
};
</script>

<style lang="scss">
.header-block {
  width: 100%;
  max-height: 51px;
  padding: 0 15%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff !important;

  .routerLink {
    text-decoration: none;
    padding: 0 !important;
    .v-toolbar__title {
      height: 100%;
      font-family: Georgia;
      font-size: 32px;
      font-weight: bold;
      color: #000000;
      padding: 0 !important;
      text-decoration: none;
    }
  }
}

.footer-block {
  width: 100%;
  height: 116px;
  padding: 0;
  background-color: #ffffff !important;
  padding: auto auto;

  .copyright {
    font-family: Georgia;
    font-size: 12px;
    padding: 0;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
  }
}
</style>
