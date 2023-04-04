<template>
  <div class="game-card">
    <img :src="getGameBanner(data.gameId)" alt="Game Logo" />
    <h2>{{ data.title }}</h2>
    <div class="buttons">
      <FormKit type="button" @click="handleClaim" outer-class="nav-button">I'll take it!</FormKit>
      <FormKit type="button" @click="handleInfo" outer-class="nav-button">What is this game?</FormKit>
      <FormKit type="button" @click="handleMark" v-if="isLoggedIn" outer-class="nav-button" input-class="claim-button"
        >Mark Claimed</FormKit
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import type { GameData } from '@/types';

const emit = defineEmits(['markClaimed']);

const props = defineProps<{
  data: GameData;
}>();

const isLoggedIn = ref(false);
const loggedInUser = ref<User | null>(null);

onAuthStateChanged(getAuth(), function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
    loggedInUser.value = user;
  } else {
    isLoggedIn.value = false; // if we do not
  }
});

function getGameBanner(gameId: string | number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId.toString()}/header.jpg`;
}

function handleClaim() {
  if (props.data.humble_url.toLowerCase().includes('humblebundle.com')) {
    window.open(props.data.humble_url, '_blank');
  } else {
    window.open(`https://store.steampowered.com/account/registerkey?key=` + props.data.humble_url, '_blank'); //Url is probably steam key, go redeem.
  }
}

function handleInfo() {
  window.open(`https://store.steampowered.com/app/${props.data.gameId.toString()}/`);
}

function handleMark() {
  emit('markClaimed', props.data);
}
</script>

<style lang="scss">
.claim-button {
  background-color: red !important;
}
</style>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.game-card {
  @include drop-shadow;
  @include rounded-corners;
  background-color: #fff;
  width: 50%;
  margin: 10px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.game-card img {
  width: 400px;
  height: auto;
}

.game-card h2 {
  display: inline-block;
  margin: 0;
  width: 100%;
  vertical-align: middle;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.nav-button {
  margin: 0;
}
</style>
