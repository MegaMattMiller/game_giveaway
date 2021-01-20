<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <h1>Page for adding games!</h1>
  </b-overlay>
</template>
<script>
export default {
  name: 'Add',
  data() {
    return {
      loading: false
    };
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
