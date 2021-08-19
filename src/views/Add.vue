<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <b-container>
      <h1>Page for adding games!</h1>
      <b-form-input v-model="gameName" placeholder="Game Name"></b-form-input>
      <b-form-input v-model="humbleUrl" placeholder="Humble Gift URL"></b-form-input>
      <b-form-input v-model="gameId" placeholder="Game ID"></b-form-input>
      <b-button variant="success" @click="handleSubmitClicked">Submit</b-button>
    </b-container>
  </b-overlay>
</template>
<script>
export default {
  name: 'Add',
  data() {
    return {
      loading: false,
      gameName: '',
      humbleUrl: '',
      gameId: ''
    };
  },
  methods: {
    handleSubmitClicked: function() {
      if (this.gameName.trim == '' || this.humbleUrl.trim == '') {
        return;
      }
      this.loading = true;
      var payload = {};
      payload.title = this.gameName;
      payload.url = this.humbleUrl;
      payload.gameId = this.gameId;
      this.$store.dispatch('submitData', payload).then(() => {
        this.$store.dispatch('getData').then(() => {
          this.loading = false;
          this.gameName = '';
          this.humbleUrl = '';
          this.gameId = '';
        });
      });
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
