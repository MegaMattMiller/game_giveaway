<template>
  <nav class="nav-bar">
    <h1 class="header" @click="navigate('/')">Matts Extra Keys</h1>
    <FormKit type="button" @click="handleAdd" v-if="isLoggedIn" outer-class="nav-button">Add Game</FormKit>
    <FormKit type="button" @click="handleSignOut" v-if="isLoggedIn" outer-class="nav-button">Logout</FormKit>
    <FormKit type="button" @click="navigate('/signin')" v-if="!isLoggedIn" outer-class="nav-button">Sign In</FormKit>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';

const router = useRouter();
const isLoggedIn = ref(false);
const loggedInUser = ref<User | null>(null);

// runs after firebase is initialized
onAuthStateChanged(getAuth(), function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
    loggedInUser.value = user;
    console.log('user is logged in ', user.uid);
  } else {
    isLoggedIn.value = false; // if we do not
  }
});

const handleSignOut = () => {
  signOut(getAuth());
  router.push('/');
};

function handleAdd() {
  router.push('/edit');
}

function navigate(path: string = '/') {
  router.push(path);
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.nav-bar {
  @include drop-shadow;
  @include rounded-corners;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0 10px 10px;
  margin: 10px;
  background-color: #f9f9f9;
}

.nav-button {
  margin: 0;
}

.header {
  flex-grow: 2;
  margin: 0;
  padding-left: 10px;
  cursor: pointer;
}
</style>
