<template>
  <main>
    <div v-if="!loading">
      <GameCard v-for="(game, index) in games" :key="index" :data="game" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { gameStore } from '@/stores/gameStore.js';
import GameCard from '@/components/GameCard.vue';

const store = gameStore();
let loading = ref(true);

const { games } = storeToRefs(store);

async function getGames(startAt: number = 0) {
  console.log('startAt', startAt);
  await store.getKeyRange(startAt);
  console.log('games', games.value);
  loading.value = false;
}

getGames();
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.card {
  @include drop-shadow;
  @include rounded-corners;
  max-width: 700px;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
}
</style>
