<template>
  <div v-if="!loading" class="editor">
    <FormKit type="form" id="gameForm" @submit="submitHandler">
      <FormKit
        type="text"
        name="id"
        label="Game ID"
        value=""
        validation="required|number"
        help="Game ID from steamdb.info"
      />
      <FormKit type="text" name="name" label="Game Name" value="" validation="required" help="Game Name" />
      <FormKit type="url" name="url" label="Game URL" value="" validation="required|url" help="Humble Bundle URL" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onBeforeUnmount, ref } from 'vue';
import { gameStore } from '@/stores/gameStore.js';

const store = gameStore();

const router = useRouter();
const loggedInUser = ref<User | null>(null);
const loading = ref(true);

const authListener = onAuthStateChanged(getAuth(), function (user) {
  loggedInUser.value = user;
  if (!user) {
    // not logged in
    alert('you must be logged in to view this. redirecting to the home page');
    router.push('/');
  }
  getData();
});

function getData() {
  loading.value = false;
}

const submitHandler = async (newData: any) => {
  if (loggedInUser.value === null) {
    alert('you must be logged in to view this. redirecting to the home page');
    router.push('/');
    return;
  }
  console.log('newData', newData);
  let resp = await store.addGame(loggedInUser.value?.uid, newData.name, newData.url, newData.id);
  if (resp.id != undefined) {
    router.push('/');
  }
};

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});
</script>

<style lang="scss">
.submit-button {
  width: 100% !important;
  margin: 0 auto !important;
}

.submit-button-wrapper {
  width: 80% !important;
  margin: 0 auto !important;
}

.preview-button-wrapper {
  width: 100% !important;
  margin: 0 auto !important;
}
</style>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.editor {
  @include drop-shadow;
  @include rounded-corners;
  background-color: #fff;
  width: 50%;
  margin: 10px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>
