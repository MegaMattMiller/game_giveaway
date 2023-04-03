import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { plugin, defaultConfig } from '@formkit/vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import '@formkit/themes/genesis';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/* code from our Firebase console */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID as string,
};
// Initialize Firebase
const fb = initializeApp(firebaseConfig);
getFirestore(fb);

const app = createApp(App);

app.use(plugin, defaultConfig()); // Formkit
app.use(autoAnimatePlugin); // FormKit AutoAnimate
app.use(createPinia()); // Pinia
app.use(router); // Vue Router
app.mount('#app');
