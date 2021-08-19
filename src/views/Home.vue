<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <b-container>
      <h1>Matt's Extra Games!</h1>
      <h2>Let me know which games you redeem!</h2>
      <router-link v-if="hasAuth" :to="addGameUrl">Add Game</router-link>
      <b-card v-for="(game, index) in this.$store.state.data.games" :key="index" border-variant="dark">
        <b-card-img
          v-if="game.gameId != undefined"
          v-bind:src="getGameBanner(game.gameId)"
          :alt="game.title"
          top
          style="width: 400px;"
        ></b-card-img>
        <b-card-title>{{ game.title }}</b-card-title>
        <b-button :href="game.humble_url">I'll take it!</b-button>
        <b-button v-if="game.gameId == undefined" :href="getSearchUrl(game.title)" class="details-button"
          >What is this game?</b-button
        >
        <b-button v-if="game.gameId != undefined" :href="getSteamDBUrl(game.gameId)" class="details-button"
          >What is this game?</b-button
        >
        <b-button v-if="hasAuth" @click="makeGameAsRedeemed(game)" class="details-button" variant="danger"
          >Mark Claimed</b-button
        >
        <b-form v-if="hasAuth">
          <b-form-input v-model="game.gameId" placeholder="Game ID"></b-form-input>
          <b-button variant="success" @click="addGameID(game, game.gameId)">Submit</b-button>
        </b-form>
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
export default {
  name: 'Home',
  data() {
    return {
      loading: true
    };
  },
  computed: {
    hasAuth: function() {
      if (this.$route.query.auth == process.env.VUE_APP_PASSWORD) {
        return true;
      } else {
        return false;
      }
    },
    addGameUrl: function() {
      return `/add?auth=${this.$route.query.auth}`;
    }
  },
  mounted() {
    this.$store.dispatch('getData').then(() => {
      this.loading = false;
    });
  },
  methods: {
    getGameBanner: function(gameId) {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header.jpg`;
    },
    makeGameAsRedeemed: function(gameObject) {
      console.dir(gameObject);
      this.loading = true;
      var payload = {};
      payload.ref = gameObject.ref;
      this.$store.dispatch('markGameRedeemed', payload).then(() => {
        this.$store.dispatch('getData').then(() => {
          this.loading = false;
        });
      });
    },
    addGameID: function(gameObject, gameId) {
      console.dir(gameObject);
      this.loading = true;
      var payload = {};
      payload.ref = gameObject.ref;
      payload.gameId = gameId;
      this.$store.dispatch('setGameID', payload).then(() => {
        this.$store.dispatch('getData').then(() => {
          this.loading = false;
        });
      });
    },
    getSearchUrl: function(gameTitle) {
      var searchUrl = `http://www.google.com/search?q=${encodeURIComponent(gameTitle)}+game+steam`;
      return searchUrl;
    },
    getSteamDBUrl: function(gameId) {
      return `https://store.steampowered.com/app/${gameId}/`;
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
