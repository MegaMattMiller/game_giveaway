<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

body {
  padding: 0;
  margin: 0;
  font-family: 'Karla', sans-serif;

  background-color: #e5e5f7;
}

.nodrag {
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

/* Grow */
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  transform: scale(1.1);
}
</style>
