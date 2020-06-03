<template>
  <v-app>
    <v-app-bar class="header-block">
      <a class="routerLink" href="/">
        <v-toolbar-title v-text="title" />
      </a>

      <div>
        <github-badge slug="FooQoo/json-diff-checker" />
      </div>
    </v-app-bar>
    <v-content>
      <v-container v-if="!this.$store.state.loading">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer class="footer-block">
      <v-flex xs24 sm16 md12>
        <v-row
          no-gutters
          style="display: flex; justify-content: center;align-items: center;"
        >
          <ShareNetwork
            network="facebook"
            url="https://json-diff-checker.fooqoo56.com/"
            title="Json Diff Checker"
            class="ma-4"
          >
            <i class="fab fa-facebook fa-2x"></i>
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            url="https://json-diff-checker.fooqoo56.com/"
            title="Json Diff Checker"
            class="ma-4"
          >
            <i class="fab fa-twitter fa-2x"></i>
          </ShareNetwork>
        </v-row>
        <v-row no-gutters>
          <v-col class="copyright text-center">{{ copyright }}</v-col>
        </v-row>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      copyright: 'Copyright © 2020 FooQoo. All Rights Reserved.',
      title: 'Json Diff Checker'
    };
  },
  mounted() {
    setTimeout(() => this.$store.commit('stopLoading'), 5);
  }
};
</script>

<style lang="scss">
.header-block {
  width: 100%;
  max-height: 64px;
  padding: 0 15%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff !important;

  .routerLink {
    text-decoration: none;
    padding: 0 !important;
    .v-toolbar__title {
      height: 100%;
      font-family: Georgia;
      font-size: 28px;
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
