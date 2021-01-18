<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <b-container>
      <h1>Matt's Extra Games!</h1>
      <h2>Let me know which games you redeem!</h2>
      <b-card v-for="game in this.$store.state.data.games" :key="game.id" border-variant="dark">
        <b-card-title>{{ game.title }}</b-card-title>
        <b-button :href="game.humble_url">I'll take it!</b-button>
        <b-button :href="getSearchUrl(game.title)" class="details-button">What is this game?</b-button>
      </b-card>
      <div class="footer-div">
        <a href="https://github.com/MegaMattMiller/game_giveaway" class="footer-logo"
          ><b-icon icon="github" class="github-icon"></b-icon
        ></a>
      </div>
    </b-container>
  </b-overlay>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    this.$store.dispatch('getData').then(() => {
      this.loading = false;
    });
  },
  methods: {
    getSearchUrl: function(gameTitle) {
      var searchUrl = `http://www.google.com/search?q=${encodeURIComponent(gameTitle)}+game+steam`;
      return searchUrl;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-div {
  text-align: center;
}

.footer-logo {
  text-align: center;
  font-size: 40px;
  color: #000;
}

.details-button {
  margin-left: 10px;
}
</style>
