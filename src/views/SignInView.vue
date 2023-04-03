<template>
  <div class="form-wrapper">
    <FormKit
      type="form"
      @submit="signIn"
      submit-label="Login"
      :submit-attrs="{
        inputClass: 'submit-button',
      }"
    >
      <h1>Login to Your Account</h1>
      <p v-if="errMsg" class="error">{{ errMsg }}</p>
      <FormKit type="text" name="email" id="email" label="Email" validation="required|email" v-model="email" />
      <FormKit
        type="password"
        name="password"
        id="password"
        label="Password"
        validation="required"
        v-model="password"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errMsg = ref();

const router = useRouter();

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully logged in!');
      router.push('/');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        default:
          errMsg.value = 'Email or password was incorrect';
          break;
      }
    });
};
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.form-wrapper form {
  @include drop-shadow;
  @include rounded-corners;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 20px;
  max-width: 25em;
  background-color: #fff;
}
.submit-button {
  width: 100% !important;
}
</style>

<style lang="scss" scoped>
.form-wrapper {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.form-wrapper h1 {
  text-align: center;
  margin-top: 0;
}

.form-wrapper p {
  text-align: center;
}

.error {
  color: red;
}
</style>
