<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <h1>Matt's Extra Games!</h1>
    <h2>Let me know which games you redeem!</h2>
    <b-card v-for="game in this.$store.state.data.games" :key="game.id">
      <b-card-title>{{ game.title }}</b-card-title>
      <b-button :href="game.humble_url" variant="primary">I'll take it!</b-button>
    </b-card>
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
  }
};
</script>
